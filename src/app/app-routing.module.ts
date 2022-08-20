import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ShowComponent} from "./main/show/show.component";
import {ProductsComponent} from "./main/products/products.component";
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./auth/login/login.component";
import {AUTH, LOGIN, NEW_PASSWORD, REGISTRATION} from "./services/consts";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {NewPasswordComponent} from "./auth/new-password/new-password.component";

const routes: Routes = [
  {path: '', component: MainComponent, children: [
      { path: 'events/:id', component: ShowComponent },
      { path: 'products/:id', component: ProductsComponent }
    ]},
  { path: AUTH, component: AuthComponent, children: [
      { path: LOGIN, component: LoginComponent },
      { path: REGISTRATION, component: RegistrationComponent },
      { path: NEW_PASSWORD, component: NewPasswordComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
