import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {AppState} from '../domain/state';
import {getCookie, savelocalStorage, setCookie, showlocalStorage} from '../storage/storage';
import {LOGIN} from '../actions/auth.actions';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, private store$: Store<AppState>, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.store$.select(appState => appState.auth)
      .map(auth => {
        if (auth.hasError) {
          const id = showlocalStorage('id');
          const password = showlocalStorage('password');
          savelocalStorage('redirectUrl', url);
          if (id && password && id != 'undefined' && password != 'undefined') {
            this.authService.loginWithCredentials(id, password);
          } else {
            this.router.navigateByUrl('/login');
          }
        }
        return !auth.hasError;
      });
  }

  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;
    const isTrue = this.store$.select(appState => appState.auth)
      .map(auth => !auth.hasError);
    console.log(isTrue);
    if (!isTrue) {
      this.router.navigateByUrl('/login');
    }
    return isTrue;
  }
}
