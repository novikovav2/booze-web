import {Component} from "@angular/core";
import {
  faFaceSmile,
  faListCheck,
  faMartiniGlassCitrus,
  faUserPlus,
  faUsersGear
} from "@fortawesome/free-solid-svg-icons";
import {ROOT_URL, WELCOME_URL} from "../services/consts";

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent {
  iconLogo = faUsersGear
  ROOT_URL = ROOT_URL
  WELCOME_URL = WELCOME_URL
  iconPlus = faUserPlus
  iconMartini = faMartiniGlassCitrus
  iconListCheck = faListCheck
  iconFaceSmile = faFaceSmile
}
