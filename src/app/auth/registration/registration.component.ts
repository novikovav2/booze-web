import {Component} from "@angular/core";
import {AUTH_URL, LOGIN, MSG_ERROR, MSG_REGISTRATION_SUCCESS, ROOT_URL} from "../../services/consts";
import {faSpinner, faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Auth} from "../../models/auth";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegistrationComponent {
  ROOT_URL = ROOT_URL
  iconLogo = faUsersGear
  AUTH_URL = AUTH_URL
  LOGIN = LOGIN
  passwordsEqual = true
  spinner = faSpinner
  showSpinner = false

  form = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.email]),
    password: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
    password_confirmation: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
  })

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {  }

  onSubmit() {
    this.showSpinner = true
    const email = this.form.controls['email'].value
    const password = this.form.controls['password'].value
    if (email && password) {
      const newUser: Auth = { email, password }
      this.authService.registration(newUser)
        .subscribe({
          next: () => {
            this.toastr.success(MSG_REGISTRATION_SUCCESS)
            this.router.navigate([AUTH_URL, LOGIN])
          },
          error: (error) => {
            this.toastr.error(MSG_ERROR)
            console.log(error)
            this.showSpinner = false
          }
        })
    }
  }
}
