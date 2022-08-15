import {Component} from "@angular/core";
import {faUsersGear} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  icon = faUsersGear
}
