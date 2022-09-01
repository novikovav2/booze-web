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
import {ProductsComponent} from "./products/products.component";
import {ProductsEatersComponent} from "./products/eaters/products-eaters.component";
import {IndexComponent} from "./index/index.component";
import {EventNewComponent} from "./new/event-new.component";
import {EventEditComponent} from "./edit/event-edit.component";
import {ResultsComponent} from "./results/results.component";
import {ProfileComponent} from "./profile/profile.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../services/auth.interceptor";

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    ShowComponent,
    ShowProductsComponent,
    ProductsComponent,
    ProductsEatersComponent,
    IndexComponent,
    EventNewComponent,
    EventEditComponent,
    ResultsComponent,
    ProfileComponent
  ],
  exports: [
    MainComponent,
    HeaderComponent,
    ShowComponent,
    ShowProductsComponent,
    ProductsComponent,
    ProductsEatersComponent,
    IndexComponent,
    EventNewComponent,
    EventEditComponent,
    ResultsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    EventsService,
    ProductsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class MainModule {

}
