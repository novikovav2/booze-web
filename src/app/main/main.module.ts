import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {HeaderComponent} from "./header/header.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import {ShowComponent} from "./show/show.component";
import {EventsService} from "../services/events.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShowProductsComponent} from "./show/products/show-products.component";
import {ProductsService} from "../services/products.service";

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    ShowComponent,
    ShowProductsComponent
  ],
  exports: [
    MainComponent,
    HeaderComponent,
    ShowComponent,
    ShowProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    EventsService,
    ProductsService
  ]
})
export class MainModule {

}
