import {Component} from "@angular/core";
import {faSpinner, faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {
  AUTH_TOKEN,
  AUTH_URL, EVENTS,
  MAIN_URL, MSG_ERROR,
  MSG_LOGIN_SUCCESS,
  REGISTRATION, RESET_PASSWORD,
  ROOT_URL
} from "../../services/consts";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Auth} from "../../models/auth";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent {
  iconLogo = faUsersGear
  ROOT_URL = ROOT_URL;
  AUTH_URL = AUTH_URL
  REGISTRATION = REGISTRATION
  RESET_PASSWORD = RESET_PASSWORD
  spinner = faSpinner
  showSpinner = false

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {  }

  onSubmit() {
    this.showSpinner = true
    const email = this.form.controls['email'].value
    const password = this.form.controls['password'].value
    if (email && password) {
      const user: Auth = { email, password }
      this.authService.login(user)
        .subscribe({
          next: (data) => {
            localStorage.setItem(AUTH_TOKEN, JSON.stringify(data))
            this.router.navigate([MAIN_URL, EVENTS])
            this.toastr.success(MSG_LOGIN_SUCCESS)
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
