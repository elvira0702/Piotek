import {Form} from '../domain/entities';
import * as FormActions from '../actions/form.actions';
import {ADD_FORM, FETCH_FROM_API} from '../actions/form.actions';

export type Action = FormActions.All;

export function formReducer(state: Form[] = [], action: Action) {
  switch (action.type) {
    case ADD_FORM:
      return [...state, action.payload];
    case FETCH_FROM_API:
      return [...action.payload];
    default:
      return state;
  }
}
