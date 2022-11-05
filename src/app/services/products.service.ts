import {Injectable} from "@angular/core";
import {Eater, NewProduct, Product, PRODUCT_DEFAULT} from "../models/product";
import {environment} from "../../environments/environment";
import {EVENTS_URL, PRODUCTS_URL} from "./consts";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

@Injectable()
export class ProductsService {
  url = environment.apiUrl

  product: Product = PRODUCT_DEFAULT

  constructor(private http: HttpClient) {  }

  getProducts(eventId: string) {
    return this.http.get<Product[]>(this.url + EVENTS_URL + '/' + eventId + PRODUCTS_URL)
  }

  getOne(id: string) {
    return this.http.get<Product>(this.url + PRODUCTS_URL + '/' + id)
  }

  delete(id: string) {
    return this.http.delete(this.url + PRODUCTS_URL + '/' + id)
  }

  update(id: string, product: any) {
    return this.http.put(this.url + PRODUCTS_URL + '/' + id, product)
  }

  add(product: NewProduct) {
    return this.http.post(this.url + PRODUCTS_URL, product)
  }

  getEaters(productId: string) {
    const eater: Eater = {
      user: {
        id: 'aaa',
        username: 'Username'
      },
      count: 0
    }
    return of([eater])
  }
}
