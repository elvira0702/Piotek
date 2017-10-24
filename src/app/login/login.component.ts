import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';
import {Auth} from '../domain/entities';
import {AppState} from '../domain/state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {savelocalStorage, showlocalStorage} from '../storage/storage';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  public loginForm: FormGroup;
  auth: Observable<Auth>;

  // 存储错误信息
  formErrors = {
    'id': '',
    'password': ''
  };
  // 错误对应的提示
  validationMessages = {
    'id': {
      'required': '请输入工号'
    },
    'password': {
      'required': '请输入密码'
    }
  };

  constructor(public fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
      rememberState: [true]
    });
  }

  ngDoCheck(): any {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      // 取到表单字段
      const control = this.loginForm.get(field);
      // 表单字段已修改或无效
      if (control && control.touched && control.invalid) {
        // 取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        // 从errors里取出错误类型，再拼上该错误对应的信息
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
        }
      }
    }
  }

  login() {
    const userId = this.loginForm.get('id').value;
    const password = this.loginForm.get('password').value;
    if (this.loginForm.valid) {
      this.authService.loginWithCredentials(userId, password);
      this.auth = this.authService.getAuth();
    }
  }

  nav() {
    this.router.navigateByUrl('/register');
  }

}
