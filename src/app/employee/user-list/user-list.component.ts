import {Component, OnInit} from '@angular/core';
import {AppState} from '../../domain/state';
import {Store} from '@ngrx/store';
import {Auth, UserInfo} from '../../domain/entities';
import {Observable} from 'rxjs';
import {FETCH_FROM_API} from '../../actions/user.actions';
import {UserService} from '../../core/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public isList = true;
  public departments = ['研发部', '资讯部', '人事部', '设计部', '工业工程部', '业务部'];
  auth$: Observable<Auth>;
  filterData$: Observable<UserInfo[]>;
  currUser: UserInfo;
  curDep: string;

  constructor(private userService: UserService, private store$: Store<AppState>,
              private routeInfo: ActivatedRoute) {
    this.auth$ = store$.select(appState => appState.auth);
    this.auth$.subscribe(auth => {
      this.currUser = auth.user;
    });
    const fetchData$ = userService.getUsers()
      .flatMap(users => {
        this.store$.dispatch({type: FETCH_FROM_API, payload: users});
        return this.store$.select('users');
      }).startWith([]);
    this.filterData$ = this.routeInfo.params.pluck('dep').do(value => {
      const dep = value as string;
      fetchData$.subscribe(users => users.find(user => user.dep === dep));
    })
  }

  ngOnInit() {
  }
}

