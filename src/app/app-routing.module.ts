import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ShowComponent} from "./main/show/show.component";
import {ProductsComponent} from "./main/products/products.component";

const routes: Routes = [
  {path: '', component: MainComponent, children: [
      { path: 'events/:id', component: ShowComponent },
      { path: 'products/:id', component: ProductsComponent }
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
