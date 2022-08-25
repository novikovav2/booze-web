import {User} from "./user";

export interface Member {
  id: string,
  eventId: string,
  user: User
}

export interface NewMember {
  eventId: string,
  username: string
}
