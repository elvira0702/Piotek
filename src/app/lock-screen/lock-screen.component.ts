import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {removeCookie} from '../storage/storage';
import {UserInfo} from '../domain/entities';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.css']
})
export class LockScreenComponent implements OnInit {
  public lockForm: FormGroup;
  public currUser: UserInfo;
  error = false;
  url;

  constructor(public fb: FormBuilder, private router: Router,
              private routeInfo: ActivatedRoute,private authService: AuthService) {
    this.lockForm = fb.group({
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth=>{
      this.currUser = auth.user;
    });
    this.url = this.routeInfo.snapshot.params['url'];
  }

  getIn() {
    const password = this.lockForm.get('password').value;
    if (password === this.currUser.password) {
      this.error = false;
      this.router.navigateByUrl(this.url);
    }else{
      this.error = true;
    }
  }

  login(){
    removeCookie('userId');
    this.router.navigateByUrl('/login');
  }

}
