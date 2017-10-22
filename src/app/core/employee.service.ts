import { Observable } from 'rxjs/Observable';

import { EmployeeInfo } from '../domain/entities';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

@Injectable()
export class EmployeeService {

  private api_url = 'api/EmployeeInfos';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getEmployee(userId: string): Observable<EmployeeInfo> {
    const url = `${this.api_url}/${userId}`;
    return this.http.get(url)
      .map(res => {
        let Employees = res.json() as EmployeeInfo[];
        return (Employees.length>0) ? Employees[0] : null;
      });
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
