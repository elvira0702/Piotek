import {Injectable} from '@angular/core';

import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {UserInfo} from '../domain/entities';
import {Store} from '@ngrx/store';
import {AppState} from '../domain/state';
import {UPDATE_USER} from '../actions/user.actions';

@Injectable()
export class UserService {

  private api_url = 'api/userInfo';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private store$: Store<AppState>) {
  }

  getUser(userId: string): Observable<UserInfo> {
    const url = `${this.api_url}/${userId}`;
    return this.http.get(url).map(res => res.json() as UserInfo).catch(this.handleError);
  }

  getUsers(): Observable<UserInfo[]> {
    return this.http.get(this.api_url).map(res=> res.json() as UserInfo[])
      .catch(this.handleError);
  }

  addUser(user: UserInfo): Observable<UserInfo> {
    return this.http.post(this.api_url, JSON.stringify(user),{headers: this.headers})
      .map(res => res.json() as UserInfo).catch(this.handleError);
  }

  updateUser(user: UserInfo): void {
    this.http.put(this.api_url, JSON.stringify(user), {headers: this.headers})
      .mapTo(user).subscribe(user => {
        this.store$.dispatch({type: UPDATE_USER, payload: user});
      });
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
