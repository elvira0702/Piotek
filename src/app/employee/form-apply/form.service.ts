import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {AppState} from '../../domain/state';
import {Store} from '@ngrx/store';
import {ADD_FORM} from '../../actions/form.actions';
import {Router} from '@angular/router';
import {Form} from '../../domain/entities';

@Injectable()
export class FormService {
  private api_url = 'api/formList';
  private headers = new Headers({'Content-Type': 'application/json'});
  private auth$: Observable<string>;

  constructor(private http: Http, private store$: Store<AppState>, private router: Router) {
    this.auth$ = this.store$.select(appstate => appstate.auth)
      .filter(auth => auth.user != null)
      .map(auth => auth.user.userId);
  }

  getFormList(): Observable<Form[]> {
    return this.auth$.flatMap(userId => this.http.get(`${this.api_url}?userId=${userId}`))
      .map(res => res.json() as Form[]);
  }

  getFormNumber(formDate, callback) {
    this.http.get('/api/formApply/' + formDate).subscribe(formNumber => {
      callback(formNumber.json())
    })
  }

  addForm(form: Form) {
    let body = JSON.stringify(form);
    this.auth$.flatMap(userId => {
      return this.http.post(this.api_url, JSON.stringify(form), {headers: this.headers})
        .map(res => res.json() as Form);
    }).subscribe(form => {
      this.store$.dispatch({type: ADD_FORM, payload: form});
      this.router.navigate(['/employee/form-apply']);
    })
  }

}
