import {User} from "./user";

export interface Eater {
  user: User,
  count: number
}

export interface Product {
  id: string,
  eventId: string,
  title: string,
  price: number,
  total: number,
  buyer: User,
  eaters?: Eater[],
  eatersCount?: number
}

export const PRODUCT_DEFAULT: Product = {
  id: '',
  eventId: '',
  title: '',
  price: 0,
  total: 0,
  buyer: {
    id: '',
    username: '',
    type: 'bot'
  },
  eaters: []
}

export interface NewProduct {
  eventId: string,
  title: string,
  price: number,
  total: number,
  buyerId: string,
  eaters: Eater[]
}
