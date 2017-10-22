import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './user-list/user-list.component';
import {FormApplyComponent} from './form-apply/form-apply.component';
import {SelfInfoComponent} from './self-info/self-info.component';
import {WorkListComponent} from './work-list/work-list.component';
import {EmployeeComponent} from './employee.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {FormService} from './form-apply/form.service';
import {SocketService} from './header/socket.service';
import {FormListComponent} from './form-apply/form-list/form-list.component';
import {FormTypeComponent} from './form-apply/form-type/form-type.component';
import {SharedModule} from '../shared/shared.module';
import {TodoService} from './work-list/todo.service';
import {EmployeeRoutingModule} from './employee-routing.module';

@NgModule({
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],
  declarations: [
    EmployeeComponent,
    HomeComponent,
    UserListComponent,
    SelfInfoComponent,
    WorkListComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    FormApplyComponent,
    FormListComponent,
    FormTypeComponent
  ],
  providers: [FormService, SocketService, TodoService]
})
export class EmployeeModule {
}
