import {StoreModule} from '@ngrx/store';
import {todoReducer} from '../reducers/todo.reducer';
import {authReducer} from '../reducers/auth.reducer';
import {AuthService} from './auth.service';
import {HttpModule} from '@angular/http';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AuthGuardService} from './auth-guard.service';
import {UserService} from './user.service';
import {EmployeeService} from './employee.service';
import {userReducer} from '../reducers/user.reducer';
import {formReducer} from '../reducers/form.reducer';

@NgModule({
  imports: [
    HttpModule,
    StoreModule.forRoot({
      todos: todoReducer,
      auth: authReducer,
      users: userReducer,
      forms: formReducer
    })
  ],
  providers: [AuthService, UserService, AuthGuardService, EmployeeService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
