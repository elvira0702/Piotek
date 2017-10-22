import {Action} from '@ngrx/store';
import {Form} from '../domain/entities';

export const ADD_FORM = 'ADD_FORM';
export const FETCH_FROM_API = 'FETCH_FROM_API';

export class AddForm implements Action {
  readonly type = ADD_FORM;

  constructor(public payload: Form) {
  }
}

export class FetchFromApi implements Action {
  readonly type = FETCH_FROM_API;

  constructor(public payload: Form[]){
  }
}

export type All = AddForm | FetchFromApi;
