import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AUTH,
  MAIN, NOT_FOUND,
  ROOT, WELCOME
} from "./services/consts";
import {StaticComponent} from "./static/static.component";
import {WelcomeComponent} from "./static/welcome/welcome.component";
import {NotFoundComponent} from "./static/404/404.component";

const routes: Routes = [
  { path: MAIN, loadChildren: () => import('./main/main.module')
      .then(module => module.MainModule)
  },
  { path: AUTH, loadChildren: () => import('./auth/auth.module')
                                  .then(module => module.AuthModule)},
  { path: ROOT, component: StaticComponent },
  { path: WELCOME, component: WelcomeComponent },
  { path: NOT_FOUND, pathMatch: "full", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
