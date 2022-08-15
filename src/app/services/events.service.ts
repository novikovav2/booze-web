import {Injectable} from "@angular/core";
import {Event, Member, NewMember, Product} from "./event.model";
import {of} from "rxjs";

@Injectable()
export class EventsService {
  event: Event = {
    id: '111',
    title: 'Просто по пиву',
    reason: 'Повод не нужен',
    evented_at: '01.09.2022',
    isPublic: true
  }

  members: Member[] = [
    { id: 'aaa', title: 'Иванов', type: 'man' },
    { id: 'bbb', title: 'Петров', type: 'man' },
    { id: 'ccc', title: 'Сидоров', type: 'bot' }
  ]

  getOne(id: string) {
    return of(this.event)
  }

  getMembers(id: string) {
    return of(this.members)
  }

  addMember(bot: NewMember) {
    return of(true)
  }


}
