import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkListComponent} from './work-list/work-list.component';
import {SelfInfoComponent} from './self-info/self-info.component';
import {FormTypeComponent} from './form-apply/form-type/form-type.component';
import {FormListComponent} from './form-apply/form-list/form-list.component';
import {FormApplyComponent} from './form-apply/form-apply.component';
import {HomeComponent} from './home/home.component';
import {EmployeeComponent} from './employee.component';
import {UserListComponent} from './user-list/user-list.component';
import {AuthGuardService} from '../core/auth-guard.service';

const employeeRoutes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    children: [
      {path: '', redirectTo: '/employee/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'user-list/:dep', component: UserListComponent},
      {
        path: 'form-apply', component: FormApplyComponent,
        children: [
          {path: '', component: FormListComponent},
          {path: 'form-type/:type', component: FormTypeComponent}
        ]
      },
      {path: 'self-info', component: SelfInfoComponent},
      {path: 'work-list', component: WorkListComponent}
    ],
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
