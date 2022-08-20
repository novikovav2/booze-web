import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "../services/auth.service";
import {RegistrationComponent} from "./registration/registration.component";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
