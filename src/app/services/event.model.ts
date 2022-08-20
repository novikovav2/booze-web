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
  username: string,
  count?: number
}
export interface Product {
  id: string,
  eventId: string,
  title: string,
  price: number,
  total: number,
  buyerId: string,
  eaters: Eater[]
}



export const PRODUCT_DEFAULT: Product = {
  id: 'aaa',
  eventId: 'aaa',
  title: 'Пиво',
  price: 78,
  total: 0,
  buyerId: 'bbb',
  eaters: []
}
