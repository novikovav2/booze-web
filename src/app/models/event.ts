export type EVENT_STATUS = 'active' | 'archive'

export interface Event {
  id: string,
  title: string,
  reason: string,
  evented_at: Date,
  isPublic: boolean,
  status?: EVENT_STATUS
}

export interface EventNew {
  title: string,
  reason: string,
  evented_at: Date,
  isPublic: boolean,
  status: EVENT_STATUS
}

export const EVENT_DEFAULT: Event = {
  id: '',
  title: '',
  reason: '',
  evented_at: new Date(),
  isPublic: true,
  status: "active"
}
