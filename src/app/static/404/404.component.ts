import {Component} from "@angular/core";
import {ROOT_URL} from "../../services/consts";
import {faUsersGear} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-not-found',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})
export class NotFoundComponent {
  ROOT_URL = ROOT_URL
  icon = faUsersGear
}
