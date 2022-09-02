import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "../services/auth.service";
import {RegistrationComponent} from "./registration/registration.component";
import {NewPasswordComponent} from "./new-password/new-password.component";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    NewPasswordComponent
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
