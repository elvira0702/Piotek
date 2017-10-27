import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {AppState} from '../../domain/state';
import {Store} from '@ngrx/store';
import {Auth, UserInfo} from '../../domain/entities';
import {UserService} from '../../core/user.service';

@Component({
  selector: 'app-self-info',
  templateUrl: './self-info.component.html',
  styleUrls: ['./self-info.component.css']
})
export class SelfInfoComponent implements OnInit, OnDestroy {

  myInfoForm: FormGroup;
  aboutMeForm: FormGroup;
  auth$: Observable<Auth>;
  currUser: UserInfo;
  edit = false;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private store$: Store<AppState>, private userService: UserService) {
  }

  ngOnInit() {
    this.aboutMeForm = this.fb.group({
      edu: [''],
      loc: [''],
      skill: [''],
      motto: ['']
    });
    this.myInfoForm = this.fb.group({
      password: [''],
      tel: [''],
      email: ['']
    });
    this.auth$ = this.store$.select(appState => appState.auth);
    this.subscription = this.auth$.subscribe(auth => {
      if (auth.user) {
        this.currUser = auth.user;
        this.myInfoForm.reset({
          password: [auth.user.password],
          tel: [auth.user.tel],
          email: [auth.user.email]
        });
        this.aboutMeForm.reset({
          edu: [auth.user.edu],
          loc: [auth.user.loc],
          skill: [auth.user.skill],
          motto: [auth.user.motto]
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save() {
    if (this.edit) {
      let isChange = false;
      const myInfo = this.myInfoForm.value;
      const aboutme = this.aboutMeForm.value;
      for (const key in myInfo) {
        if (myInfo[key] != this.currUser[key]) {
          this.currUser[key] = myInfo[key];
          isChange = true;
        }
      }
      for (const key in aboutme) {
        if (aboutme[key] != this.currUser[key]) {
          this.currUser[key] = aboutme[key];
          isChange = true;
        }
      }
      if (isChange) {
        this.userService.updateUser(this.currUser);
      }
    }
  }

}
