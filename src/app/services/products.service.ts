import {Injectable} from "@angular/core";
import {MemberProduct, NewProduct, Product} from "../models/product";
import {environment} from "../../environments/environment";
import {EVENTS_URL, MEMBERS_URL, PRODUCTS_URL} from "./consts";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProductsService {
  url = environment.apiUrl

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

  getMembersProducts(memberId: string) {
    return this.http.get<MemberProduct[]>(this.url + PRODUCTS_URL + MEMBERS_URL + '/' + memberId)
  }

  updateMembersProducts(memberId: string, products: MemberProduct[]) {
    return this.http.put(this.url + PRODUCTS_URL + MEMBERS_URL + '/' + memberId, products)
  }

}
