import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../../domain/state';
import {Store} from '@ngrx/store';
import {Auth, UserInfo} from '../../domain/entities';
import {FETCH_FROM_API} from '../../actions/user.actions';
import {UserService} from '../../core/user.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs';
import {zoomIn, zoomOut} from '../../animations/animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations:[zoomIn,zoomOut]
})
export class UserListComponent implements OnInit, OnDestroy {

  public isList = true;
  public departments = ['全部', '研发部', '资讯部', '人事部', '设计部', '工业工程部', '业务部'];
  auth$: Observable<Auth>;
  depList: Observable<UserInfo[]>;
  currUser: UserInfo;
  fetchData$: Observable<UserInfo[]>;
  filterData$: Observable<string>;
  curDep: string;
  show = false;
  showUser: UserInfo;
  subscription: Subscription;

  constructor(private userService: UserService, private store$: Store<AppState>,
              private elementRef: ElementRef) {
    this.auth$ = store$.select(appState => appState.auth);
    this.subscription = this.auth$.subscribe(auth => {
      if (auth.user) {
        this.currUser = auth.user;
        this.curDep = auth.user.dep;
      }
    });
  }

  ngOnInit() {
    this.fetchData$ = this.userService.getUsers()
      .flatMap(users => {
        this.store$.dispatch({type: FETCH_FROM_API, payload: users});
        return this.store$.select('users');
      }).startWith([]);
    const init$ = Observable.from([this.curDep]);
    this.filterData$ = Observable.merge(init$, Observable.fromEvent(this.elementRef.nativeElement, 'click').map(() => this.curDep));
    this.depList = Observable.combineLatest(this.fetchData$, this.filterData$,
      (users: UserInfo[], dep: string) => {
        return dep === '全部' ? users : users.filter(user => user.dep === dep)
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showDetail(user: UserInfo) {
    this.showUser = user;
    this.show = true;
  }

}

