import {Component} from "@angular/core";
import {faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {AUTH_URL, LOGIN, REGISTRATION, ROOT_URL} from "src/app/services/consts";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['../auth.component.scss']
})
export class NewPasswordComponent {
  ROOT_URL = ROOT_URL
  iconLogo = faUsersGear
  AUTH_URL = AUTH_URL
  LOGIN = LOGIN
  REGISTRATION = REGISTRATION

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private authService: AuthService,
              private router: Router) {  }

  onSubmit() {
    const email = this.form.controls['email'].value
    if (email) {
      this.authService.newPassword(email)
        .subscribe({
          next: () => {
            this.router.navigate([AUTH_URL, LOGIN])
          },
          error: (error) => { console.log(error) }
        })
    }
  }
}
