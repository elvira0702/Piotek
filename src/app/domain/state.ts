import {Auth, Form, Todo, UserInfo} from './entities';
export {Auth, Form, Todo, UserInfo};

export interface AppState {
  todos: Todo[];
  forms: Form[];
  auth: Auth;
  users: UserInfo[];
}
