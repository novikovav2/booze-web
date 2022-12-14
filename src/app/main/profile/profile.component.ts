import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MSG_ERROR, MSG_PASSWORD_UPDATED, MSG_UPDATED} from "../../services/consts";
import {NewPassword, NewProfile} from "../../models/profile";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../main.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false
  form = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('')
  })

  formPassword = new FormGroup({
    password: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
    password_confirmation: new FormControl('',
      [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService,
              private toastr: ToastrService) {  }

  ngOnInit() {
    this.loading = true
    this.authService.getProfile()
      .subscribe({
        next: (data) => {
          this.form.controls['id'].setValue(data.id)
          this.form.controls['username'].setValue(data.username)
          this.loading = false
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  onSubmitForm() {
    this.loading = true
    const username = this.form.controls['username'].value
    if (username) {
      const newProfile: NewProfile = { username }
      this.authService.updateProfile(newProfile)
        .subscribe({
          next: () => {
            this.toastr.success(MSG_UPDATED)
            this.loading = false
          },
          error: (error) => {
            this.toastr.error(MSG_ERROR)
            console.log(error)
          }
        })
    }

  }

  onSubmitPassword() {
    this.loading = true
    const password = this.formPassword.controls['password'].value
    const password_confirm = this.formPassword.controls['password_confirmation'].value
    if (password && password === password_confirm) {
      const newPassword: NewPassword = { password }
      this.authService.updatePassword(newPassword)
        .subscribe({
          next: () => {
            this.loading = false
            this.toastr.success(MSG_PASSWORD_UPDATED)
          },
          error: (error) => {
            this.toastr.error(MSG_ERROR)
            console.log(error)
          }
        })
    }
  }
}
