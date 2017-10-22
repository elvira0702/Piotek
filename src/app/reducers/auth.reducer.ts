import { Auth } from '../domain/entities';
import {
  LOGIN_FAILED_NOT_EXISTED,
  LOGIN_FAILED_NOT_MATCH,
  LOGOUT,
  LOGIN,
  REGISTER,
  REGISTER_FAILED_EXISTED,
  REGISTER_FAILED_NOT_HIRED, UPDATE_AUTH
} from '../actions/auth.actions';
import * as AuthActions from '../actions/auth.actions';
export type Action = AuthActions.All;

export function authReducer (state: Auth = {
  user: null,
  hasError:true,
  errMsg: null,
  redirectUrl: null
}, action: Action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, action.payload, {hasError: false});
    case LOGIN_FAILED_NOT_EXISTED:
      return Object.assign({}, state, {
        user: null,
        hasError: true,
        errMsg: '用户不存在！'
      });
    case LOGIN_FAILED_NOT_MATCH:
      return Object.assign({}, state, {
        user: null,
        hasError: true,
        errMsg: '密码错误！'
      });
    case LOGOUT:
      return Object.assign({}, state, {
        user: null,
        hasError: true,
        errMsg: '未登录',
        redirectUrl: '/login'
      });
    case REGISTER:
      return Object.assign({}, action.payload, {hasError: false});
    case REGISTER_FAILED_EXISTED:
      return Object.assign({}, state, {
        user: null,
        hasError: true,
        errMsg: '用户已存在！'
      });
    case REGISTER_FAILED_NOT_HIRED:
      return Object.assign({}, state, {
        user: null,
        hasError: true,
        errMsg: '员工不存在！'
      });
    case UPDATE_AUTH:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
