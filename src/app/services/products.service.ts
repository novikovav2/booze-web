import {Injectable} from "@angular/core";
import {Product} from "./event.model";
import {of} from "rxjs";

@Injectable()
export class ProductsService {
  products: Product[] = [
    { id: 'aaa', title: 'Пиво', price: 100, total: 0, buyerId: 'aaa', eaters: [] },
    { id: 'aaa', title: 'Квас', price: 80, total: 2, buyerId: 'aaa', eaters: [] },
    { id: 'aaa', title: 'Закусь', price: 1000, total: 0, buyerId: 'aaa', eaters: [] }
  ]

  getProducts(eventId: string) {
    return of(this.products)
  }
}
