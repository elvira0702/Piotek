import {Action} from '@ngrx/store';
import {Auth} from '../domain/entities';

export const LOGIN = 'LOGIN';
export const LOGIN_FAILED_NOT_EXISTED = 'LOGIN_FAILED_NOT_EXISTED';
export const LOGIN_FAILED_NOT_MATCH = 'LOGIN_FAILED_NOT_MATCH';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const REGISTER_FAILED_EXISTED = 'REGISTER_FAILED_EXISTED';
export const REGISTER_FAILED_NOT_HIRED = 'REGISTER_FAILED_NOT_HIRED';
export const UPDATE_AUTH = 'UPDATE_AUTH';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Auth) {
  }
}

export class LoginFailedNotExisted implements Action {
  readonly type = LOGIN_FAILED_NOT_EXISTED;
}

export class LoginFailedNotMatch implements Action {
  readonly type = LOGIN_FAILED_NOT_MATCH;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload: Auth) {
  }
}

export class RegisterFailedExisted implements Action {
  readonly type = REGISTER_FAILED_EXISTED;
}

export class RegisterFailedNotHired implements Action {
  readonly type = REGISTER_FAILED_NOT_HIRED;
}

export class UpdateAuth implements Action {
  readonly type = UPDATE_AUTH;

  constructor(public payload: Auth) {
  }
}

export type All = Login | LoginFailedNotExisted | LoginFailedNotMatch | Logout
  | Register | RegisterFailedExisted | RegisterFailedNotHired | UpdateAuth;
