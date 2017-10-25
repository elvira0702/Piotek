import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {Page404Component} from './page404/page404.component';
import {LockScreenComponent } from './lock-screen/lock-screen.component';
import {EmployeeModule} from './employee/employee.module';
import {SelectivePreloadingStrategy} from './preload/selective-preloading-strategy';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    Page404Component,
    LockScreenComponent
  ],
  imports: [
    BrowserModule,
    EmployeeModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [SelectivePreloadingStrategy],
  bootstrap: [AppComponent]
})
export class AppModule {
}
