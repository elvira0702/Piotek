import * as UserActions from '../actions/user.actions';
import {UserInfo} from '../domain/entities';
import {FETCH_FROM_API, UPDATE_USER} from '../actions/user.actions';

export type Action = UserActions.All;

export function userReducer(state: UserInfo[] = [], action: Action) {
  switch (action.type) {
    case UPDATE_USER:
      return state.map(user => {
        if (user.userId !== action.payload.userId) {
          return user;
        }
        return Object.assign({}, action.payload)
      });
    case FETCH_FROM_API:
      return [...action.payload];
    default:
      return state;
  }
}


