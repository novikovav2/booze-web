import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LOGIN, NEW_PASSWORD, REGISTRATION} from "../services/consts";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {NewPasswordComponent} from "./new-password/new-password.component";
import {AuthComponent} from "./auth.component";

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      { path: '', redirectTo: LOGIN, pathMatch: "full" },
      { path: LOGIN, component: LoginComponent },
      { path: REGISTRATION, component: RegistrationComponent },
      { path: NEW_PASSWORD, component: NewPasswordComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
