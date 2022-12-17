export type EVENT_STATUS = 'active' | 'archive'

export interface EventNew {
  title: string,
  reason: string,
  evented_at: string,
  isPublic: boolean | null,
  status: EVENT_STATUS,
  withCommonMoney: boolean
}

export interface Event extends EventNew {
  id: string
}

export const EVENT_DEFAULT: Event = {
  id: '',
  title: '',
  reason: '',
  evented_at: '',
  isPublic: true,
  status: "active",
  withCommonMoney: false
}
