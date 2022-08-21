import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {StaticComponent} from "./static.component";

@NgModule({
  declarations: [
    StaticComponent
  ],
  exports: [
    StaticComponent
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
