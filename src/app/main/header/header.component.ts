import {Component} from "@angular/core";
import {faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {
  MAIN_URL,
  EVENTS,
  PROFILE,
  AUTH_URL,
  LOGIN,
  MSG_LOGOUT_SUCCESS,
  AUTH_TOKEN
} from "../../services/consts";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  icon = faUsersGear
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS
  PROFILE = PROFILE
  AUTH_URL = AUTH_URL
  LOGIN = LOGIN

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) {
    console.log(authService.isAuthenticate())
  }

  onExit() {
    this.router.navigate([AUTH_URL, LOGIN])
    this.toastr.success(MSG_LOGOUT_SUCCESS)
    this.authService.logout()
      .subscribe({
        next: () => {localStorage.removeItem(AUTH_TOKEN)},
        error: (error) => {
          console.log(error)
          localStorage.removeItem(AUTH_TOKEN)
        }
      })
  }
}
