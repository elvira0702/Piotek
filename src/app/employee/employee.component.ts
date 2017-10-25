import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import 'rxjs/add/operator/filter';
import {UserInfo} from '../domain/entities';
import {AuthService} from '../core/auth.service';
import {Subscription} from 'rxjs';

declare var $: any;


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, DoCheck, OnDestroy {

  public menus: Array<Menu>;
  public currUrl;
  public title = ['', ''];
  public currUser: UserInfo;
  subscription: Subscription;

  constructor(private location: Location, private authService: AuthService) {
    this.menus = [
      new Menu('glyphicon glyphicon-home', '首页', ['./home'], []),
      new Menu('glyphicon glyphicon-user', '个人信息', ['./self-info'], []),
      new Menu('glyphicon glyphicon-book', '通讯录', ['./user-list'], []),
      new Menu('glyphicon glyphicon-list-alt', '待办事项', ['./work-list'], []),
      new Menu('glyphicon glyphicon-file', '表单申请', ['./form-apply'], [
        new Menu('', '离职单', ['./form-apply/form-type', 'quit'], []),
        new Menu('', '外出单', ['./form-apply/form-type', 'out'], []),
        new Menu('', '请假单', ['./form-apply/form-type', 'holiday'], [])
      ])
    ];
  }

  ngOnInit() {
    this.subscription = this.authService.getAuth().subscribe(auth=> {
      this.currUser = auth.user;
    });
    /*if ($.AdminLTE.controlSidebar) {
      $.AdminLTE.controlSidebar.activate();
    }*/
  }

  ngDoCheck(): void {
    if (this.currUrl != this.location.path()) {
      this.currUrl = this.location.path();
      this.title = this.setTitle(this.menus, this.currUrl);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  setTitle(menus: Array<Menu>, url) {
    let title = ['', ''];
    menus.forEach(menu => {
      if (url.match(menu.link)) {
        title = [menu.title, ''];
        if (menu.children.length > 0) {
          menu.children.forEach(menu => {
            if (url.match(menu.link[1])) {
              title[1] = menu.title;
              return;
            }
          })
        }
        return;
      }
    });
    return title;
  }
}

export class Menu {
  constructor(public icon: string,
              public title: string,
              public link: Array<string>,
              public children: Array<Menu>) {
  }
}
