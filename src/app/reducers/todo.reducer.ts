import {Todo} from '../domain/entities';
import {ADD_TODO, FETCH_FROM_API, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO} from '../actions/todo.actions';

import * as TodoActions from '../actions/todo.actions';

export type Action = TodoActions.All;

export function todoReducer(state: Todo[] = [], action: Action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case UPDATE_TODO:
      return state.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return Object.assign({}, action.payload)
      });
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);
    case TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return Object.assign({}, todo, {isDone: !todo.isDone});
      });
    case FETCH_FROM_API:
      return [...action.payload];
    default:
      return state;
  }
}
