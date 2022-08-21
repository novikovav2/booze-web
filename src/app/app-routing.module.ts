import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ShowComponent} from "./main/show/show.component";
import {ProductsComponent} from "./main/products/products.component";
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./auth/login/login.component";
import {
  AUTH,
  LOGIN,
  MAIN,
  NEW_PASSWORD,
  REGISTRATION,
  EVENTS,
  PRODUCTS,
  NEW_URL,
  EDIT_URL,
  RESULTS_URL, PROFILE, ROOT
} from "./services/consts";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {NewPasswordComponent} from "./auth/new-password/new-password.component";
import {IndexComponent} from "./main/index/index.component";
import {EventNewComponent} from "./main/new/event-new.component";
import {EventEditComponent} from "./main/edit/event-edit.component";
import {ResultsComponent} from "./main/results/results.component";
import {ProfileComponent} from "./main/profile/profile.component";
import {StaticComponent} from "./static/static.component";

const routes: Routes = [
  {path: MAIN, component: MainComponent, children: [
      { path: '', redirectTo: EVENTS, pathMatch: "full" },
      { path: EVENTS, component: IndexComponent },
      { path: EVENTS + NEW_URL, component: EventNewComponent },
      { path: EVENTS + EDIT_URL + '/:id', component: EventEditComponent },
      { path: EVENTS + RESULTS_URL + '/:id', component: ResultsComponent },
      { path: EVENTS + '/:id', component: ShowComponent },
      { path: PRODUCTS + '/:id', component: ProductsComponent },
      { path: PROFILE, component: ProfileComponent }
    ]},
  { path: AUTH, component: AuthComponent, children: [
      { path: '', redirectTo: LOGIN, pathMatch: "full" },
      { path: LOGIN, component: LoginComponent },
      { path: REGISTRATION, component: RegistrationComponent },
      { path: NEW_PASSWORD, component: NewPasswordComponent }
    ]},
  { path: ROOT, component: StaticComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
