import {Injectable} from "@angular/core";
import {NewProduct, Product, PRODUCT_DEFAULT} from "../models/product";
import {of} from "rxjs";
import {environment} from "../../environments/environment";
import {EVENTS_URL, PRODUCTS_URL} from "./consts";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProductsService {
  url = environment.apiUrl

  product: Product = PRODUCT_DEFAULT

  constructor(private http: HttpClient) {  }

  getProducts(eventId: string) {
    return this.http.get<Product[]>(this.url + EVENTS_URL + '/' + eventId + PRODUCTS_URL)
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

  add(product: NewProduct) {
    return this.http.post(this.url + PRODUCTS_URL, product)
  }
}
