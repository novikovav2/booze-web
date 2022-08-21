import {Component} from "@angular/core";
import {faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {MAIN_URL, EVENTS} from "../../services/consts";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  icon = faUsersGear
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS
}
