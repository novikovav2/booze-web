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
import {ConfirmationComponent} from "./confirmation/confirmation.component";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    NewPasswordComponent,
    ConfirmationComponent
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    NewPasswordComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
