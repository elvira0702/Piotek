import {Action} from '@ngrx/store';
import {UserInfo} from '../domain/entities';

export const UPDATE_USER = 'UPDATE_USER';
export const FETCH_FROM_API = 'FETCH_FROM_API';

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: UserInfo) {
  }
}

export class FetchFormApi implements Action {
  readonly type = FETCH_FROM_API;

  constructor(public payload: UserInfo[]) {
  }
}

export type All = UpdateUser | FetchFormApi;
