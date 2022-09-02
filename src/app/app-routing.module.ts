import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AUTH,
  MAIN,
  ROOT, WELCOME
} from "./services/consts";
import {StaticComponent} from "./static/static.component";
import {WelcomeComponent} from "./static/welcome/welcome.component";

const routes: Routes = [
  { path: MAIN, loadChildren: () => import('./main/main.module')
      .then(module => module.MainModule)
  },
  { path: AUTH, loadChildren: () => import('./auth/auth.module')
                                  .then(module => module.AuthModule)},
  { path: ROOT, component: StaticComponent },
  { path: WELCOME, component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
