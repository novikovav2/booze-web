import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainModule} from "./main/main.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthModule} from "./auth/auth.module";
import {StaticModule} from "./static/static.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {registerLocaleData} from "@angular/common";
import ru from "@angular/common/locales/ru"


registerLocaleData(ru)

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    FontAwesomeModule,
    AuthModule,
    StaticModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
