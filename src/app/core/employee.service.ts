import {Observable} from 'rxjs/Observable';

import {EmployeeInfo} from '../domain/entities';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

@Injectable()
export class EmployeeService {

  private api_url = 'api/employeeInfo';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getEmployee(userId: string): Observable<EmployeeInfo> {
    const url = `${this.api_url}/${userId}`;
    return this.http.get(url)
      .map(res => res.json() as EmployeeInfo);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
