import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {SocketService} from './socket.service';
import {Auth, UserInfo} from '../../domain/entities';
import {Observable} from 'rxjs';
import {AppState} from '../../domain/state';
import {Store} from '@ngrx/store';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  messageCount = '';
  public currUser: UserInfo;
  auth$: Observable<Auth>;

  constructor(private router: Router, private socketService: SocketService, private authService: AuthService,
              private location: Location, private store$: Store<AppState>) {
    this.auth$ = this.store$.select(appState => appState.auth);
    this.auth$.subscribe(auth => {
      this.currUser = auth.user;
    });
  }

  ngOnInit() {
    this.socketService.createObservableSocket('ws://47.95.219.65:85')
      .map(event => JSON.parse(event))
      .subscribe(
        event => this.messageCount = event.messageCount
      )
  }

  logout() {
    this.authService.unAuth();
    this.router.navigate(['/login']);
  }

  lockScreen() {
    const url = this.location.path();
    this.router.navigate(['/lock-screen', url]);
  }

}
