export interface Event {
  id: string,
  title: string,
  reason: string,
  evented_at: string,
  isPublic: boolean
}

export const EVENT_DEFAULT: Event = {
  id: '',
  title: '',
  reason: '',
  evented_at: '',
  isPublic: true
}

export type MemberType = 'man' | 'bot'
export interface Member {
  id: string,
  title: string,
  type: MemberType
}

export interface NewMember {
  username: string
}

export interface Eater {
  id: string,
  username: string
}
export interface Product {
  id: string,
  title: string,
  price: number,
  total: number,
  buyerId: string,
  eaters: Eater[]
}
