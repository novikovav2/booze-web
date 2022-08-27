import {User} from "./user";
import {Member} from "./member";

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

export interface NewProduct {
  eventId: string,
  title: string,
  price: number,
  total: number,
  buyerId: string,
  eaters: Member[]
}
