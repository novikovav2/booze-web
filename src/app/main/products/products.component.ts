import {Component, OnInit} from "@angular/core";
import {Member, Product, PRODUCT_DEFAULT} from "../../services/event.model";
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsService} from "../../services/events.service";
import {MAIN_URL, EVENTS} from "../../services/consts";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product = PRODUCT_DEFAULT
  title: string = ''
  price: number = 0
  total: number = 0
  buyerId: string = 'bbb'
  members: Member[] = []
  eaters: any[] = []
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS

  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private eventService: EventsService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.getData(id)
    }
  }

  getData(id: string) {
    this.productService.getOne(id)
      .subscribe({
        next: (data) => {
          this.product = data
          this.title = data.title
          this.price = data.price
          this.total = data.total
          this.buyerId = data.buyerId
          this.getMembers(data.eventId)
        },
        error: (error) => { console.log(error) }
      })
  }

  getMembers(eventId: string) {
    this.eventService.getMembers(eventId)
      .subscribe({
        next: (data) => {
          this.members = data
        },
        error: (error) => { console.log(error) }
      })
  }

  onChange(event: any) {
    this.eaters = event
  }

  onSave() {
    const product: any = {
      title: this.title,
      price: this.price,
      total: this.total,
      buyerId: this.buyerId,
      eaters: this.eaters
    }
    this.productService.update(this.product.id, product)
      .subscribe({
        next: () => { this.router.navigate(['events', this.product.eventId]) },
        error: (error) => { console.log(error) }
      })
  }

  onDelete() {
    this.productService.delete(this.product.id)
      .subscribe({
        next: () => { this.router.navigate(['events', this.product.eventId]) },
        error: (error) => { console.log(error) }
      })
  }

  onCancel() {
    this.router.navigate([MAIN_URL, EVENTS, this.product.eventId])
  }
}
