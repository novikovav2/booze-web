import {Injectable} from "@angular/core";
import {Member, NewMember} from "./event.model";
import {of} from "rxjs";
import {EVENT_STATUS, Event, EventNew} from "../models/event";
import {Result} from "../models/result";

@Injectable()
export class EventsService {
  event: Event = {
    id: '111',
    title: 'Просто по пиву',
    reason: 'Повод не нужен',
    evented_at: '01.09.2022',
    isPublic: true,
    status: "active"
  }

  members: Member[] = [
    { id: 'aaa', title: 'Иванов', type: 'man' },
    { id: 'bbb', title: 'Петров', type: 'man' },
    { id: 'ccc', title: 'Сидоров', type: 'bot' }
  ]

  eventsActive: Event[] = [
    {
      id: '111',
      title: 'Просто по пиву',
      reason: 'Повод не нужен',
      evented_at: '01.09.2022',
      isPublic: true,
      status: 'active'
    },
    {
      id: '222',
      title: 'Просто по пиву2',
      reason: 'Повод нужен',
      evented_at: '02.09.2022',
      isPublic: false,
      status: 'active'
    }
  ]

  eventsArchive: Event[] = [
    {
      id: '111',
      title: 'Просто по пиву',
      reason: 'Повод не нужен',
      evented_at: '01.09.2021',
      isPublic: true,
      status: 'archive'
    },
    {
      id: '222',
      title: 'Просто по пиву2',
      reason: 'Повод нужен',
      evented_at: '02.09.2021',
      isPublic: false,
      status: 'archive'
    }
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
    let result: any = ''
    switch (flag) {
      case 'active':
        result = this.eventsActive;
        break
      case 'archive':
        result = []
        break
    }
    return of(result)

  }

  getOne(id: string) {
    return of(this.event)
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

}
