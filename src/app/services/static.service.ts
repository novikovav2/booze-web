import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {EVENTS_URL} from "./consts";
import {HttpClient} from "@angular/common/http";
import {Event} from "../models/event";

@Injectable()
export class StaticService {
  url = environment.apiUrl + EVENTS_URL

  constructor(private http: HttpClient) {  }

  startWithoutRegistration() {
    return this.http.get<Event>(this.url + '/generate')
  }
}
