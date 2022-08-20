import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {Auth} from "../models/auth";

@Injectable()
export class AuthService {
  login(user: Auth) {
    const token = 'AAAaaaBBBbbb1234567890'
    return of(token)
  }

  registration(newUser: Auth) {
    return of(true)
  }

  resetPassword() {

  }
}
