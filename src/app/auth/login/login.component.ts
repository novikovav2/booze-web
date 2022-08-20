import {Component} from "@angular/core";
import {faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {AUTH_TOKEN, AUTH_URL, MAIN_URL, NEW_PASSWORD, REGISTRATION, ROOT_URL} from "../../services/consts";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Auth} from "../../models/auth";
import {Router} from "@angular/router";

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
  NEW_PASSWORD = NEW_PASSWORD

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService,
              private router: Router) {  }

  onSubmit() {
    const email = this.form.controls['email'].value
    const password = this.form.controls['password'].value
    if (email && password) {
      const user: Auth = { email, password }
      this.authService.login(user)
        .subscribe({
          next: (data) => {
            localStorage.setItem(AUTH_TOKEN, data)
            this.router.navigate([MAIN_URL])
          },
          error: (error) => { console.log(error) }
        })
    }
  }
}
