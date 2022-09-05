import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {Auth, ConfirmationData, Token} from "../models/auth";
import {NewPassword, NewProfile} from "../models/profile";
import {environment} from "../../environments/environment";
import {AUTH_TOKEN, AUTH_URL, CONFIRMATION_URL, LOGIN_URL, PROFILE_URL, REGISTRATION_URL} from "./consts";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable()
export class AuthService {
  url = environment.apiUrl + AUTH_URL

  constructor(private http: HttpClient) {  }

  login(user: Auth) {
    return this.http.post<Token>(this.url + LOGIN_URL, user)
  }

  logout() {
    return this.http.delete(this.url + LOGIN_URL)
  }

  registration(newUser: Auth) {
    return this.http.post(this.url + REGISTRATION_URL, newUser)
  }

  newPassword(email: string) {
    return of(true)
  }

  getProfile() {
    return this.http.get<User>(this.url + PROFILE_URL)
  }

  updateProfile(profile: NewProfile) {
    return this.http.put(this.url + PROFILE_URL, profile)
  }

  updatePassword(password: NewPassword) {
    return this.http.post(this.url + PROFILE_URL, password)
  }

  confirmation(data: ConfirmationData) {
    return this.http.post(this.url + CONFIRMATION_URL, data)
  }

  getToken() {
    let result = ''
    const now = new Date()
    const tokenObject = localStorage.getItem(AUTH_TOKEN)
    if (tokenObject) {
      const token = JSON.parse(tokenObject)
      let tokenExp = new Date(token.created_at)
      tokenExp.setSeconds(tokenExp.getSeconds() + token.ttl)

      if (tokenExp > now) {
        result = token.token
      } else {
        localStorage.removeItem(AUTH_TOKEN)
      }
    }
    return result
  }
}
