import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {AppState, Auth} from '../domain/state';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {
  LOGIN,
  LOGIN_FAILED_NOT_EXISTED,
  LOGIN_FAILED_NOT_MATCH,
  LOGOUT,
  REGISTER,
  REGISTER_FAILED_EXISTED,
  REGISTER_FAILED_NOT_HIRED
} from '../actions/auth.actions'
import {EmployeeService} from './employee.service';

@Injectable()
export class AuthService {

  constructor(private http: Http,
              private userService: UserService,
              private store$: Store<AppState>,
              private router: Router,
              private employeeService: EmployeeService) {
  }

  getAuth(): Observable<Auth> {
    return this.store$.select(appState => appState.auth);
  }

  unAuth(): void {
    this.store$.dispatch({type: LOGOUT});
  }

  register(userId: string, password: string): void {
    this.userService.getUser(userId).subscribe(user => {
      if (user != null) {
        this.store$.dispatch({type: REGISTER_FAILED_EXISTED});
      } else {
        this.employeeService.getEmployee(userId).subscribe(employee => {
          if (employee = null) {
            this.store$.dispatch({type: REGISTER_FAILED_NOT_HIRED});
          } else {
            let toAddUser = {
              userId: employee.userId,
              name: employee.name,
              dep: employee.dep,
              hiredate: employee.hiredate,
              password: password,
              tel: '未填写',
              email: '未填写',
              photo: '未填写',
              edu: '未填写',
              loc: '未填写',
              skill: '未填写',
              motto: '未填写'
            };
            this.store$.dispatch({
              type: REGISTER, payload: {
                user: toAddUser,
                hasError: false,
                errMsg: null,
                redirectUrl: null
              }
            });
          }
        })
      }
    });
  }

  loginWithCredentials(userId: string, password: string): void {
    this.userService.getUser(userId).subscribe(user => {
        if (null === user) {
          this.store$.dispatch({type: LOGIN_FAILED_NOT_EXISTED});
        }
        else if (password !== user.password) {
          this.store$.dispatch({type: LOGIN_FAILED_NOT_MATCH});
        } else {
          this.store$.dispatch({
            type: LOGIN, payload: {
              user: user,
              hasError: false,
              errMsg: null,
              redirectUrl: null
            }
          });
          this.router.navigate(['/employee']);
        }
      });
  }
}
