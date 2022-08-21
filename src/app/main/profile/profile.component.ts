import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../main.component.scss']
})
export class ProfileComponent implements OnInit {

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

  constructor(private authService: AuthService) {  }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe({
        next: (data) => {
          this.form.controls['id'].setValue(data.id)
          this.form.controls['username'].setValue(data.username)
        },
        error: (error) => { console.log(error)}
      })
  }

  onSubmitForm() {
    const username = this.form.controls['username'].value
    if (username) {
      this.authService.updateProfile(username)
        .subscribe({
          next: () => {

          },
          error: (error) => { console.log(error) }
        })
    }

  }

  onSubmitPassword() {
    const password = this.formPassword.controls['password'].value
    const password_confirm = this.formPassword.controls['password_confirmation'].value
    if (password && password === password_confirm) {
      this.authService.updatePassword(password)
        .subscribe({
          next: () => {

          },
          error: (error) => { console.log(error) }
        })
    }
  }
}
