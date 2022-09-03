import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {StaticModule} from "./static/static.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {registerLocaleData} from "@angular/common";
import ru from "@angular/common/locales/ru"
import {NotFoundComponent} from "./static/404/404.component";
import {SharedModule} from "./shared/shared.module";
import {StaticService} from "./services/static.service";
import {HttpClientModule} from "@angular/common/http";


registerLocaleData(ru)

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    StaticModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    HttpClientModule
  ],
  providers: [
    StaticService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
