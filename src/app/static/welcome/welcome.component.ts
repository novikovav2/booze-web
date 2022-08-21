import {Component} from "@angular/core";
import {faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {ROOT_URL} from "../../services/consts";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['../static.component.scss']
})
export class WelcomeComponent {
  iconLogo = faUsersGear
  ROOT_URL = ROOT_URL
}
