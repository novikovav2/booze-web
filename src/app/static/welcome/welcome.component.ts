import {Component} from "@angular/core";
import {faSpinner, faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {AUTH_URL, LOGIN, MAIN_URL, ROOT_URL, EVENTS} from "../../services/consts";
import {Router} from "@angular/router";
import {StaticService} from "../../services/static.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['../static.component.scss']
})
export class WelcomeComponent {
  iconLogo = faUsersGear
  ROOT_URL = ROOT_URL
  AUTH_URL = AUTH_URL
  LOGIN = LOGIN
  spinner = faSpinner
  showSpinner = false
  error = false

  constructor(private staticService: StaticService,
              private router: Router) {  }

  withoutRegistration(event: any) {
    this.showSpinner = true
    event.preventDefault()
    this.staticService.startWithoutRegistration()
      .subscribe({
        next: (data) => {
          this.router.navigate([MAIN_URL, EVENTS, data.id])
        },
        error: (error) => {
          this.error = true
          console.log(error)
          this.showSpinner = false
        }
      })
  }


}
