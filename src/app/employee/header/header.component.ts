import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {SocketService} from './socket.service';
import {Auth, UserInfo} from '../../domain/entities';
import {Observable, Subscription} from 'rxjs';
import {AppState} from '../../domain/state';
import {Store} from '@ngrx/store';
import {AuthService} from '../../core/auth.service';
import {savelocalStorage} from '../../storage/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  messageCount = '';
  public currUser: UserInfo;
  auth$: Observable<Auth>;
  subscription: Subscription;

  constructor(private router: Router, private socketService: SocketService, private authService: AuthService,
              private location: Location, private store$: Store<AppState>) {
    this.auth$ = this.store$.select(appState => appState.auth);
    this.subscription = this.auth$.subscribe(auth => {
      this.currUser = auth.user;
    });
  }

  ngOnInit() {
    this.socketService.createObservableSocket('ws://www.elviracheng.com:85')
      .map(event => JSON.parse(event))
      .subscribe(
        event => this.messageCount = event.messageCount
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.unAuth();
  }

  lockScreen() {
    savelocalStorage('id',undefined);
    savelocalStorage('password',undefined);
    const url = this.location.path();
    this.router.navigate(['/lock-screen', url]);
  }

}
