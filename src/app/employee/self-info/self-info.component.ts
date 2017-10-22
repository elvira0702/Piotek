import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {AppState} from '../../domain/state';
import {Store} from '@ngrx/store';
import {Auth, UserInfo} from '../../domain/entities';
import {UserService} from '../../core/user.service';


@Component({
  selector: 'app-self-info',
  templateUrl: './self-info.component.html',
  styleUrls: ['./self-info.component.css']
})
export class SelfInfoComponent implements OnInit {

  myInfoForm: FormGroup;
  aboutMeForm: FormGroup;
  auth$: Observable<Auth>;
  currUser: UserInfo;
  edit = false;

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
    this.auth$ = this.store$.select(appState=>appState.auth);
    this.auth$.subscribe(auth=>{
      this.currUser = auth.user;
      this.myInfoForm.reset({
        password: [this.currUser.password],
        tel: [this.currUser.tel],
        email: [this.currUser.email]
      });
      this.aboutMeForm.reset({
        edu: [this.currUser.edu],
        loc: [this.currUser.loc],
        skill: [this.currUser.skill],
        motto: [this.currUser.motto]
      });
    })
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
      if (isChange){
        this.userService.updateUser(this.currUser);
      }
    }
  }

}
