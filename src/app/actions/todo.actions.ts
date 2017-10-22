import {Action} from '@ngrx/store';
import {Todo} from '../domain/entities';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const FETCH_FROM_API = 'FETCH_FROM_API';

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: Todo) {
  }
}

export class UpdateTodo implements Action {
  readonly type = UPDATE_TODO;

  constructor(public payload: Todo){
  }
}

export class RemoveTodo implements Action {
  readonly type = REMOVE_TODO;

  constructor(public payload: Todo) {
  }
}

export class ToggleTodo implements Action {
  readonly type = TOGGLE_TODO;

  constructor(public payload: Todo) {
  }
}

export class FetchFromApi implements Action {
  readonly type = FETCH_FROM_API;

  constructor(public payload: Todo[]){
  }
}

export type All = AddTodo | UpdateTodo | RemoveTodo | ToggleTodo | FetchFromApi;
