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
import {AuthGuard} from "./services/auth.guard";
import {NotFoundComponent} from "./static/404/404.component";
import {SharedModule} from "./shared/shared.module";


registerLocaleData(ru)

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    FontAwesomeModule,
    AuthModule,
    StaticModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
