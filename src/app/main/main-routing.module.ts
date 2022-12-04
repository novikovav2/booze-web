import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {EDIT_URL, EVENTS, MEMBERS, NEW_URL, PRODUCTS, PROFILE, RESULTS_URL} from "../services/consts";
import {MainComponent} from "./main.component";
import {IndexComponent} from "./index/index.component";
import {AuthGuard} from "../services/auth.guard";
import {EventNewComponent} from "./new/event-new.component";
import {EventEditComponent} from "./edit/event-edit.component";
import {ResultsComponent} from "./results/results.component";
import {ShowComponent} from "./show/show.component";
import {ProductsComponent} from "./products/products.component";
import {ProfileComponent} from "./profile/profile.component";
import {MembersShowComponent} from "./members/show/members-show.component";

const routes: Routes = [
  {path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: EVENTS, pathMatch: "full" },
      { path: EVENTS,
        component: IndexComponent,
        canActivate: [AuthGuard]
      },
      { path: EVENTS + NEW_URL,
        component: EventNewComponent,
        canActivate: [AuthGuard]
      },
      { path: EVENTS + EDIT_URL + '/:id', component: EventEditComponent },
      { path: EVENTS + RESULTS_URL + '/:id', component: ResultsComponent },
      { path: EVENTS + '/:id', component: ShowComponent },
      { path: PRODUCTS + '/:id', component: ProductsComponent },
      { path: PROFILE,
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      { path: MEMBERS + '/:id', component: MembersShowComponent }
    ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
