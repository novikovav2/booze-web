import {Component} from "@angular/core";
import {faUsersGear} from "@fortawesome/free-solid-svg-icons";
import {AUTH_URL, LOGIN, MSG_ERROR, MSG_NEW_PASSWORD_SET, REGISTRATION, ROOT_URL} from "src/app/services/consts";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NewPassword} from "../../models/profile";

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
    password: new FormControl('', [Validators.required,
                              Validators.minLength(6)]),
    password_confirmation: new FormControl('', [Validators.required,
                              Validators.minLength(6)])
  })

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {  }

  onSubmit() {
    const password = this.form.controls['password'].value || ''
    const password_confirmation = this.form.controls['password_confirmation'].value
    if (password === password_confirmation) {
      const userId = this.route.snapshot.paramMap.get('id') || ''
      const newPassword: NewPassword = { password, userId }
      this.authService.newPassword(newPassword)
        .subscribe({
          next: () => {
            this.toastr.success(MSG_NEW_PASSWORD_SET)
            this.router.navigate([AUTH_URL, LOGIN])
          },
          error: (error) => {
            this.toastr.error(MSG_ERROR)
            console.log(error)
            this.router.navigate([AUTH_URL, LOGIN])
          }
        })
    }
  }
}
