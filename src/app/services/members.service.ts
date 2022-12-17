import {HttpClient} from "@angular/common/http";
import {Member, MEMBER_DEFAULT, NewMember} from "../models/member";
import {Injectable} from "@angular/core";
import {EVENTS_URL, JOIN_URL, MEMBERS_URL} from "./consts";
import {environment} from "../../environments/environment";

@Injectable()
export class MembersService {
  url = environment.apiUrl + MEMBERS_URL

  member: Member = MEMBER_DEFAULT

  constructor(private http: HttpClient) {  }

  getAll(eventId: string) {
    const memberUrl = this.url + EVENTS_URL + '/' + eventId
    return this.http.get<Member[]>(memberUrl)
  }

  getOne(id: string) {
    return this.http.get<Member>(this.url + '/' + id)
  }

  add(bot: NewMember) {
    return this.http.post(this.url, bot)
  }

  remove(id: string) {
    return this.http.delete(this.url + '/' + id)
  }

  join(user: NewMember) {
    return this.http.post(this.url + JOIN_URL, user)
  }

  update(member: Member) {
    return this.http.put(this.url, member)
  }

  updateMoney(eventId: string, members: Member[]) {
    return this.http.post(this.url + EVENTS_URL + '/' + eventId, members)
  }
}

