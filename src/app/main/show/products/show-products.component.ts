import {Component, Input, OnInit} from "@angular/core";
import {NewProduct, Product} from "../../../models/product";
import {ProductsService} from "../../../services/products.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {MAIN_URL, MSG_ERROR, MSG_PRODUCT_ADDED, MSG_PRODUCT_DELETED, PRODUCTS} from "../../../services/consts";
import {Member} from "../../../models/member";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['../show.component.scss', '../../main.component.scss', './show-products.component.scss']
})
export class ShowProductsComponent implements OnInit {
  @Input() eventId: string = ''
  @Input() members: Member[] = []
  products: Product[] = []
  showHidden: boolean = false
  deleteIcon = faTrashCan
  MAIN_URL = MAIN_URL
  PRODUCTS = PRODUCTS

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    buyer: new FormControl('', [Validators.required]),
    showHidden: new FormControl(false),
    total: new FormControl(0)
  })

  constructor(private productService: ProductsService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.eventId) {
      this.getData()
    }
  }

  getData() {
    this.productService.getProducts(this.eventId)
      .subscribe({
        next: (data) => { this.products = data },
        error: (error) => {console.log(error)}
      })
  }

  toggleHidden() {
    this.showHidden = this.form.controls['showHidden'].value || false
  }

  submitForm(event: any) {
    event.preventDefault()
    const product: NewProduct = {
      eventId: this.eventId,
      title: this.form.controls['name'].value || '',
      price: this.form.controls['price'].value || 0,
      total: this.form.controls['total'].value || 0,
      buyerId: this.form.controls['buyer'].value || '',
      eaters: this.members
    }
    this.productService.add(product)
      .subscribe({
        next: () => {
          this.toastr.success(MSG_PRODUCT_ADDED)
          this.getData()
          this.form.reset()
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  onDelete(event: any, id: string) {
    event.preventDefault()
    this.productService.delete(id)
      .subscribe({
        next: () => {
          this.toastr.success(MSG_PRODUCT_DELETED)
          this.getData()
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

}
