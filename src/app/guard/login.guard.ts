import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements Resolve<string> {

  constructor(private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const id: string = route.params['id'];
    if (id) {
      return id;
    } else {
      this.router.navigate(['/login']);
      return undefined;
    }
  }
}
