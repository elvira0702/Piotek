import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {checkValidator, equalValidator} from '../validators/Validators';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';
import {Auth} from '../domain/entities';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, DoCheck {

  public formModel: FormGroup;
  public warning: string;
  auth: Auth;

  // 存储错误信息
  formErrors = {
    'id': '',
    'passwordInfo.password': '',
    'passwordInfo.pConfirm': '',
    'passwordInfo': ''
  };
  // 错误对应的提示
  validationMessages = {
    'id': {
      'required': '请输入工号'
    },
    'passwordInfo.password': {
      'required': '请输入密码',
      'minlength': '密码长度不得少于6个字符',
    },
    'passwordInfo.pConfirm': {
      'required': '请确认密码',
      'minlength': '',
    },
    'passwordInfo': {
      'equal': '密码和确认密码不匹配！'
    }
  };

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.formModel = this.fb.group({
      id: ['', Validators.required],
      passwordInfo: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        pConfirm: ['', [Validators.required, Validators.minLength(6)]]
      }, {validator: equalValidator}),
      agreeState: [true, checkValidator]
    });
  }

  ngDoCheck(): any {
    this.valide();
  }

  valide() {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      // 取到表单字段
      const control = this.formModel.get(field);
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

  pwValChanged() {
    (this.formModel.controls['passwordInfo'] as FormGroup).controls['pConfirm'].reset();
  }

  register() {
    if(this.formModel.valid){
      const userId = this.formModel.get('id').value;
      const password = this.formModel.get('passwordInfo.password').value;
      this.authService.register(userId, password);
      this.authService.getAuth().subscribe(auth=>{
        this.auth = auth;
      });
    }
  }

  nav() {
    this.router.navigateByUrl('/login');
  }
}

