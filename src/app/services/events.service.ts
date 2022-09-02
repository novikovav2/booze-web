import {Injectable} from "@angular/core";
import {NewMember} from "../models/member";
import {Member} from "../models/member";
import {Observable} from "rxjs";
import {EVENT_STATUS, Event, EventNew} from "../models/event";
import {Result} from "../models/result";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EVENTS_URL, MEMBERS_URL} from "./consts";

@Injectable()
export class EventsService {
  url = environment.apiUrl + EVENTS_URL
  urlMembers = environment.apiUrl + MEMBERS_URL

  constructor(private http: HttpClient) {  }

  getAll(flag: EVENT_STATUS) {
    let result: Observable<any>
    switch (flag) {
      case 'active':
        result = this.http.get(this.url, {
          params: new HttpParams().set('status', 'active')
        })
        break
      case 'archive':
        result = this.http.get(this.url, {
          params: new HttpParams().set('status', 'archive')
        })
        break
    }
    return result
  }

  getOne(id: string) {
    return this.http.get<Event>(this.url + '/' + id)
  }

  getMembers(id: string) {
    return this.http.get<Member[]>(this.urlMembers + '/' + id)
  }

  addMember(bot: NewMember) {
    return this.http.post(this.urlMembers, bot)
  }

  removeMember(id: string) {
    return this.http.delete(this.urlMembers + '/' + id)
  }

  addEvent(event: EventNew) {
    return this.http.post<Partial<Event>>(this.url, event)
  }

  deleteEvent(id: string) {
    return this.http.delete(this.url + '/' + id)
  }

  update(id: string, event: EventNew) {
    return this.http.put(this.url + '/' + id, event)
  }

  getResult(id: string) {
    return this.http.get<Result>(this.url + '/' + id + '/result')
  }

  startWithoutRegistration() {
    return this.http.get<Event>(this.url + '/generate')
  }

  join(user: NewMember) {
    return this.http.put(this.urlMembers, user)
  }
}
