import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationData} from "../../models/auth";
import {
  AUTH_URL,
  LOGIN,
  MSG_CONFIRM_FAILED,
  MSG_CONFIRM_SUCCESS, REGISTRATION,
  ROOT_URL
} from "../../services/consts";
import {faSpinner, faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['../auth.component.scss']
})
export class ConfirmationComponent implements OnInit {
  confirmId = ''
  loading = true
  ROOT_URL = ROOT_URL
  AUTH_URL = AUTH_URL
  LOGIN = LOGIN
  iconLogo = faUsersGear
  spinner = faSpinner

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router) {  }

  ngOnInit() {
    this.confirmId = this.route.snapshot.paramMap.get('id') || ''
    if (this.confirmId) {
      const data: ConfirmationData = {
        confirmationId: this.confirmId
      }
      this.authService.confirmation(data)
        .subscribe({
          next: () => {
            this.toastr.success(MSG_CONFIRM_SUCCESS)
            this.router.navigate([AUTH_URL, LOGIN])
          },
          error: (error) => {
            console.log(error)
            this.toastr.error(MSG_CONFIRM_FAILED)
            this.router.navigate([AUTH_URL, REGISTRATION])
          }
        })
    }
  }
}
