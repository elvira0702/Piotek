import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {AppState} from '../../domain/state';
import {Observable} from 'rxjs';
import {Todo} from '../../domain/entities';
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO} from '../../actions/todo.actions';
import { UUID } from 'angular-uuid';

@Injectable()
export class TodoService {
  private api_url = 'api/todo';
  private headers = new Headers({'Content-Type': 'application/json'});
  private auth$: Observable<string>;

  constructor(private http: Http, private store$: Store<AppState>) {
    this.auth$ = this.store$.select(appstate => appstate.auth)
      .filter(auth => auth.user != null)
      .map(auth => auth.user.userId);
  }

  getTodos(): Observable<Todo[]> {
    return this.auth$.flatMap(userId => this.http.get(`${this.api_url}?userId=${userId}`))
      .map(res => res.json() as Todo[]);
  }

  addTodo(todo: Todo): void {
    this.auth$.flatMap(userId => {
      todo.userId = userId;
      todo.id = 0;
      return this.http.post(this.api_url, JSON.stringify(todo), {headers: this.headers})
        .map(res => res.json() as Todo);
    }).subscribe(todo => {
      this.store$.dispatch({type: ADD_TODO, payload: todo});
    })
  }

  updateTodo(todo: Todo): void {
    const url = `${this.api_url}/${todo.id}`;
    this.http.put(url, JSON.stringify(todo), {headers: this.headers})
      .mapTo(todo).subscribe(todo => {
      this.store$.dispatch({type: UPDATE_TODO, payload: todo});
    })
  }

  toggleTodo(todo: Todo): void {
    const url = `${this.api_url}/${todo.id}`;
    let updatedTodo = Object.assign({}, todo, {completed: !todo.isDone});
    this.http.put(url, JSON.stringify(todo), {headers: this.headers})
      .mapTo(updatedTodo).subscribe(todo => {
      this.store$.dispatch({type: TOGGLE_TODO, payload: updatedTodo});
    })
  }

  removeTodo(todo: Todo): void {
    const url = `${this.api_url}/${todo.id}`;
    this.http.delete(url, {headers: this.headers})
      .mapTo(Object.assign({}, todo))
      .subscribe(todo => {
        this.store$.dispatch({type: REMOVE_TODO, payload: todo});
      });
  }

}