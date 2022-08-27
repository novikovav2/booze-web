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
  eaters: Eater[]
}

export const PRODUCT_DEFAULT: Product = {
  id: 'aaa',
  eventId: 'aaa',
  title: 'Пиво',
  price: 78,
  total: 0,
  buyer: {
    id: 'aaa',
    username: 'aaa',
    type: 'bot'
  },
  eaters: []
}
