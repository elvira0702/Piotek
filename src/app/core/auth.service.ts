import {Injectable, Inject} from '@angular/core';

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
import {savelocalStorage, showlocalStorage} from '../storage/storage';

@Injectable()
export class AuthService {

  constructor(private userService: UserService,
              private store$: Store<AppState>,
              private router: Router,
              private employeeService: EmployeeService) {
  }

  getAuth(): Observable<Auth> {
    return this.store$.select(appState => appState.auth);
  }

  unAuth(): void {
    savelocalStorage('id', undefined);
    savelocalStorage('password', undefined);
    this.router.navigateByUrl('/login');
    this.store$.dispatch({type: LOGOUT});
  }

  register(userId: string, password: string): void {
    this.userService.getUser(userId).subscribe(user => {
      if (user.userId != 'null') {
        this.store$.dispatch({type: REGISTER_FAILED_EXISTED});
      } else {
        this.employeeService.getEmployee(userId).subscribe(employee => {
          if (employee.userId === 'null') {
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
              photo: 'assets/img/userimg.png',
              edu: '未填写',
              loc: '未填写',
              skill: '未填写',
              motto: '未填写'
            };
            this.userService.addUser(toAddUser).toPromise().then(
              user => {
                if (user) {
                  this.store$.dispatch({
                    type: REGISTER, payload: {
                      user: toAddUser,
                      hasError: false,
                      errMsg: '注册成功！'
                    }
                  });
                  savelocalStorage('id', toAddUser.userId);
                  savelocalStorage('password', toAddUser.password);
                  this.router.navigateByUrl('/employee/home');
                }
              }
            );
          }
        })
      }
    });
  }

  loginWithCredentials(userId: string, password: string): void {
    this.userService.getUser(userId).subscribe(user => {
      if (user.userId === 'null') {
        this.store$.dispatch({type: LOGIN_FAILED_NOT_EXISTED});
      }
      else if (password !== user.password) {
        this.store$.dispatch({type: LOGIN_FAILED_NOT_MATCH});
      } else {
        this.store$.dispatch({
          type: LOGIN, payload: {
            user: user,
            hasError: false,
            errMsg: '登录成功！'
          }
        });
        savelocalStorage('id', user.userId);
        savelocalStorage('password', user.password);
        const url = showlocalStorage('redirectUrl');
        if (url && url != null) {
          this.router.navigateByUrl(url);
          savelocalStorage('redirectUrl', '/employee/home');
        } else {
          this.router.navigateByUrl('/employee/home');
        }
      }
    });
  }
}
