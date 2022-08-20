import {Injectable} from "@angular/core";
import {Product} from "./event.model";
import {of} from "rxjs";

@Injectable()
export class ProductsService {
  products: Product[] = [
    { id: 'aaa', title: 'Пиво', price: 100, total: 0, buyerId: 'aaa', eaters: [], eventId: 'aaa' },
    { id: 'aaa', title: 'Квас', price: 80, total: 2, buyerId: 'aaa', eaters: [], eventId: 'aaa' },
    { id: 'aaa', title: 'Закусь', price: 1000, total: 0, buyerId: 'aaa', eaters: [], eventId: 'aaa' }
  ]

  product: Product = {
    id: 'aaa',
    title: 'Пиво',
    price: 100,
    total: 5,
    buyerId: 'aaa',
    eaters: [
      { id: 'aaa', username: 'Иванов', count: 2 },
      { id: 'bbb', username: 'Петров', count: 1 }
    ],
    eventId: 'aaa'
  }

  getProducts(eventId: string) {
    return of(this.products)
  }

  getOne(id: string) {
    return of(this.product)
  }

  delete(id: string) {
    return of(true)
  }

  update(id: string, product: any) {
    return of (this.product)
  }

}
