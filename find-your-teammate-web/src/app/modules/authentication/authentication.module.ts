import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockedComponent } from './locked/locked.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
// import { MenuController } from './signin/menu-controller';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [Page500Component, Page404Component, SigninComponent, SignupComponent, LockedComponent, ForgotPasswordComponent],
  providers: [/*MenuController*/],
  imports: [
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
