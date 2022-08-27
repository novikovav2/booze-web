import {EVENT_STATUS} from "../models/event";

export interface Event {
  id: string,
  title: string,
  reason: string,
  evented_at: string,
  isPublic: boolean,
  status?: EVENT_STATUS
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
