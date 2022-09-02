import {Component} from "@angular/core";
import {faSpinner, faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {AUTH_URL, LOGIN, MAIN_URL, ROOT_URL, EVENTS, MSG_ERROR, MSG_EVENT_GENERATED} from "../../services/consts";
import {EventsService} from "../../services/events.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

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

  constructor(private eventService: EventsService,
              private toastr: ToastrService,
              private router: Router) {  }

  withoutRegistration(event: any) {
    this.showSpinner = true
    event.preventDefault()
    this.eventService.startWithoutRegistration()
      .subscribe({
        next: (data) => {
          this.toastr.success(MSG_EVENT_GENERATED)
          this.router.navigate([MAIN_URL, EVENTS, data.id])
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
          this.showSpinner = false
        }
      })
  }


}
