import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {Auth, Token} from "../models/auth";
import {NewPassword, NewProfile, Profile} from "../models/profile";
import {environment} from "../../environments/environment";
import {AUTH_TOKEN, AUTH_URL, LOGIN_URL, PROFILE_URL, REGISTRATION_URL} from "./consts";
import {HttpClient} from "@angular/common/http";
import { DateTime } from "luxon";
import {User} from "../models/user";

@Injectable()
export class AuthService {
  url = environment.apiUrl + AUTH_URL

  profile: Profile = {
    id: 'aaa',
    username: 'Иванов Иван'
  }

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

  getToken() {
    let result = ''
    const now = DateTime.now()
    const tokenObject = localStorage.getItem(AUTH_TOKEN)
    if (tokenObject) {
      const token = JSON.parse(tokenObject)
      const expireAt = DateTime.fromISO(token.created_at)
                                .plus({second: token.ttl})
      if (expireAt > now) {
        result = token.token
      } else {
        localStorage.removeItem(AUTH_TOKEN)
      }
    }
    return result
  }
}
