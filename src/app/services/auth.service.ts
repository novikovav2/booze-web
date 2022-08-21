import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {Auth} from "../models/auth";
import {Profile} from "../models/profile";

@Injectable()
export class AuthService {

  profile: Profile = {
    id: 'aaa',
    username: 'Иванов Иван'
  }

  login(user: Auth) {
    const token = 'AAAaaaBBBbbb1234567890'
    return of(token)
  }

  registration(newUser: Auth) {
    return of(true)
  }

  newPassword(email: string) {
    return of(true)
  }

  getProfile() {
    return of(this.profile)
  }

  updateProfile(username: string) {
    return of(this.profile)
  }

  updatePassword(password: string) {
    return of(this.profile)
  }
}
