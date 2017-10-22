import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LockScreenComponent} from './lock-screen/lock-screen.component';
import {Page404Component} from './page404/page404.component';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './core/auth-guard.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lock-screen/:url', component: LockScreenComponent},
  {
    path: 'employee',
    loadChildren:'./employee/employee.module#EmployeeModule',
    data: {preload: true},
    canLoad: [AuthGuardService]
  },
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
