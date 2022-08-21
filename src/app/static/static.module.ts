import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {StaticComponent} from "./static.component";
import {WelcomeComponent} from "./welcome/welcome.component";

@NgModule({
  declarations: [
    StaticComponent,
    WelcomeComponent
  ],
  exports: [
    StaticComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  providers: []
})
export class StaticModule {

}
