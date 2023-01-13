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
import {MainRoutingModule} from "./main-routing.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatNativeDateModule} from "@angular/material/core";
import {AuthModule} from "../auth/auth.module";
import {AuthGuard} from "../services/auth.guard";
import {FooterComponent} from "./footer/footer.component";
import {MembersShowComponent} from "./members/show/members-show.component";
import {MembersService} from "../services/members.service";
import {MemberTypesPipe} from "../services/member-types.pipe";
import {CommonMoneyPipe} from "../services/common-money.pipe";
import {CommonMoneyComponent} from "./members/common-money/common-money.component";

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
    ProfileComponent,
    FooterComponent,
    MembersShowComponent,
    MemberTypesPipe,
    CommonMoneyPipe,
    CommonMoneyComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MainRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [
    EventsService,
    ProductsService,
    MembersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
  ]
})
export class MainModule {

}
