import {Component} from "@angular/core";
import {faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AUTH_URL, LOGIN, MSG_ERROR, MSG_PASSWORD_RESETED, REGISTRATION, ROOT_URL} from "src/app/services/consts";
import {ResetPassword} from "../../models/auth";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../auth.component.scss']
})
export class ResetPasswordComponent {
  ROOT_URL = ROOT_URL
  iconLogo = faUsersGear
  AUTH_URL = AUTH_URL
  LOGIN = LOGIN
  REGISTRATION = REGISTRATION

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {  }

  onSubmit() {
    const email = this.form.controls['email'].value
    if (email) {
      const resetPasswordData: ResetPassword = { email }
      this.authService.resetPassword(resetPasswordData)
        .subscribe({
          next: () => {
            this.toastr.success(MSG_PASSWORD_RESETED)
            this.router.navigate([AUTH_URL, LOGIN])
          },
          error: (error) => {
            this.toastr.error(MSG_ERROR)
            console.log(error)
          }
        })
    }
  }
}
