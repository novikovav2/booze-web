import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CONFIRMATION, LOGIN, NEW_PASSWORD, REGISTRATION, RESET_PASSWORD} from "../services/consts";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {NewPasswordComponent} from "./new-password/new-password.component";
import {AuthComponent} from "./auth.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      { path: '', redirectTo: LOGIN, pathMatch: "full" },
      { path: LOGIN, component: LoginComponent },
      { path: REGISTRATION, component: RegistrationComponent },
      { path: RESET_PASSWORD, component: ResetPasswordComponent },
      { path: NEW_PASSWORD + '/:id', component: NewPasswordComponent },
      { path: CONFIRMATION + '/:id', component: ConfirmationComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
