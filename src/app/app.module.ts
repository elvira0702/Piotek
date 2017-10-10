import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterService} from './register/register.service';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from './page404/page404.component';
import {EmployeeComponent} from './employee/employee.component';
import {HeaderComponent} from './employee/header/header.component';
import {SidebarComponent} from './employee/sidebar/sidebar.component';
import {FooterComponent} from './employee/footer/footer.component';
import {HomeComponent} from './employee/home/home.component';
import {UserListComponent} from './employee/user-list/user-list.component';
import {FormApplyComponent} from './employee/form-apply/form-apply.component';
import {UserInfoService} from './user/user-info.service';
import {FormTypeComponent} from './employee/form-apply/form-type/form-type.component';
import {FormListComponent} from './employee/form-apply/form-list/form-list.component';
import {SelfInfoComponent} from './employee/self-info/self-info.component';
import {WorkListComponent} from './employee/work-list/work-list.component';
import {StorageService} from './storage/storage.service';
import {LoginGuard} from './guard/login.guard';
import {LockScreenComponent } from './lock-screen/lock-screen.component';
import {HttpModule} from '@angular/http';
import {FormService} from './employee/form-apply/form.service';

const routeInfo: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lock-screen', component: LockScreenComponent},
  {
    path: 'employee', component: EmployeeComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'user-list', component: UserListComponent},
      {
        path: 'form-apply', component: FormApplyComponent,
        children: [
          {path: '', component: FormListComponent},
          {path: 'form-type/:type', component: FormTypeComponent}
        ]
      },
      {path: 'self-info', component: SelfInfoComponent},
      {path: 'work-list', component: WorkListComponent}
    ]
  },
  {path: '**', component: Page404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    Page404Component,
    EmployeeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    UserListComponent,
    FormApplyComponent,
    FormTypeComponent,
    FormListComponent,
    SelfInfoComponent,
    WorkListComponent,
    LockScreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routeInfo)
  ],
  providers: [RegisterService, UserInfoService, StorageService, LoginGuard, FormService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
