export interface Todo {
  id?: number;
  userId: string;
  date: string;
  time: string;
  thing: string;
  isDone: boolean;
}
export interface Auth {
  user?: UserInfo;
  hasError: boolean;
  errMsg?: string;
  redirectUrl?: string;
}
export interface EmployeeInfo {
  userId: string;
  name: string;
  dep: string;
  hiredate: string;
}
export interface UserInfo {
  userId: string;
  name: string;
  dep: string;
  hiredate: string;
  password: string;
  tel: string;
  email: string;
  photo: string;
  edu: string;
  loc: string;
  skill: string;
  motto: string;
}
export interface Form {
  id?: string;
  userId: string;
  type: string;
  state: string;
  time: string;
  reason: string;
}
