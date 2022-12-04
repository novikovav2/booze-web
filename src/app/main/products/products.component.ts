import {Component, OnInit} from "@angular/core";
import {NewProduct, Product, PRODUCT_DEFAULT} from "../../models/product";
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsService} from "../../services/events.service";
import {MAIN_URL, EVENTS, MSG_ERROR, MSG_PRODUCTS_UPDATED, MSG_PRODUCT_DELETED} from "../../services/consts";
import {ToastrService} from "ngx-toastr";
import {Member} from "../../models/member";
import {ExtendedEater} from "../../models/eater";
import {MembersService} from "../../services/members.service";

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
  eaters: ExtendedEater[] = []
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS
  loading = false
  saveTxt = 'Сохранить'
  readonly = false

  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private eventService: EventsService,
              private router: Router,
              private toastr: ToastrService,
              private memberService: MembersService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.getData(id)
    }
  }

  getData(id: string) {
    this.loading = true
    this.productService.getOne(id)
      .subscribe({
        next: (data) => {
          this.product = data
          this.title = data.title
          this.price = data.price
          this.total = data.total
          this.buyerId = data.buyer.id
          this.eaters = data.eaters || []
          this.getMembers(data.eventId)
          this.getEvent(data.eventId)
          this.loading = false
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  getMembers(eventId: string) {
    this.memberService.getAll(eventId)
      .subscribe({
        next: (data) => {
          this.members = data
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  getEvent(eventId: string) {
    this.eventService.getOne(eventId)
      .subscribe({
        next: (data) => {
          this.readonly = data.status === 'archive'
        }
      })
  }

  onChange(event: any) {
    this.eaters = event
  }

  onSave() {
    this.saveTxt = 'Сохраняется...'
    const product: NewProduct = {
      eventId: this.product.eventId,
      title: this.title,
      price: this.price,
      total: this.total,
      buyerId: this.buyerId,
      eaters: this.eaters
    }
    this.productService.update(this.product.id, product)
      .subscribe({
        next: () => {
          this.toastr.success(MSG_PRODUCTS_UPDATED)
          this.router.navigate([MAIN_URL, EVENTS, this.product.eventId])
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
          this.saveTxt = 'Сохранить'
        }
      })
  }

  onDelete() {
    this.productService.delete(this.product.id)
      .subscribe({
        next: () => {
          this.toastr.success(MSG_PRODUCT_DELETED)
          this.router.navigate([MAIN_URL, EVENTS, this.product.eventId])
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  onCancel() {
    this.router.navigate([MAIN_URL, EVENTS, this.product.eventId])
  }
}
