import {User} from "./user";

export interface Member {
  id: string,
  eventId: string,
  user: User,
  money?: number
}

export interface NewMember {
  eventId: string,
  username?: string
}

export const MEMBER_DEFAULT: Member = {
  id: 'aaa',
  eventId: 'bbb',
  user: {
    id: 'ccc',
    username: 'Bot1',
    type: 'bot'
  }
}
