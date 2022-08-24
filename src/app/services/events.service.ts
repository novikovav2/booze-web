import {Injectable} from "@angular/core";
import {Member, NewMember} from "./event.model";
import {Observable, of} from "rxjs";
import {EVENT_STATUS, Event, EventNew} from "../models/event";
import {Result} from "../models/result";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EVENTS_URL} from "./consts";

@Injectable()
export class EventsService {
  url = environment.apiUrl + EVENTS_URL

  constructor(private http: HttpClient) {  }

  event: Event = {
    id: '111',
    title: 'Просто по пиву',
    reason: 'Повод не нужен',
    evented_at: new Date(),
    isPublic: true,
    status: "active"
  }

  members: Member[] = [
    { id: 'aaa', title: 'Иванов', type: 'man' },
    { id: 'bbb', title: 'Петров', type: 'man' },
    { id: 'ccc', title: 'Сидоров', type: 'bot' }
  ]

  results: Result =
    {
      eventId: '111',
      recipients: [
        {id: 'aaa', username: 'Иванов'}
      ],
      donors: [
        {
          donor: { id: 'bbb', username: 'Петров' },
          payments: [{
            recipient: {id: 'aaa', username: 'Иванов'},
            value: 100
          }]
        },
        {
          donor: { id: 'ccc', username: 'Сидоров' },
          payments: [{
            recipient: {id: 'aaa', username: 'Иванов'},
            value: 200
          }]
        }
      ]
    }


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
    return of(this.members)
  }

  addMember(bot: NewMember) {
    return of(true)
  }

  removeMember(memberId: string, eventId: string) {
    return of(true)
  }

  addEvent(event: EventNew) {
    return of({ id: 'aaa' })
  }

  deleteEvent(id: string) {
    return of(true)
  }

  update(event: EventNew) {
    return of(this.event)
  }

  getResult(eventId: string) {
    return of(this.results)
  }

  startWithoutRegistration() {
    return this.http.get<Event>(this.url + '/generate')
  }
}
