import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {Eater, NewProduct, Product} from "../../../models/product";
import {ProductsService} from "../../../services/products.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {MAIN_URL, MSG_ERROR, MSG_PRODUCT_ADDED, MSG_PRODUCT_DELETED, PRODUCTS} from "../../../services/consts";
import {Member} from "../../../models/member";
import {ToastrService} from "ngx-toastr";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['../show.component.scss', '../../main.component.scss', './show-products.component.scss']
})
export class ShowProductsComponent implements OnInit {
  @Input() eventId: string = ''
  @Input() members: Member[] = []
  @Input() readonly: boolean = false
  products: Product[] = []
  showHidden: boolean = false
  deleteIcon = faTrashCan
  MAIN_URL = MAIN_URL
  PRODUCTS = PRODUCTS
  sum: number = 0
  loading = false
  popUpShowFlag = false
  popupX = ''
  popupY = ''
  popupEaters: Eater[] = []
  @ViewChild('popUp') popupElement: ElementRef | undefined
  spinner = faSpinner
  eatersLoading = true

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required,
                                                  Validators.min(0),
                                                  Validators.max(1000000)]),
    buyer: new FormControl('', [Validators.required]),
    showHidden: new FormControl(false),
    total: new FormControl(0)
  })

  constructor(private productService: ProductsService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.eventId) {
      this.loading = true
      this.getData()
    }
  }

  getData() {
    this.productService.getProducts(this.eventId)
      .subscribe({
        next: (data) => {
          this.products = data
          this.sum = data.reduce((accumulator, product) => {
            return accumulator + product.price
          }, 0)
          this.loading = false
        },
        error: (error) => {console.log(error)}
      })
  }

  toggleHidden() {
    this.showHidden = this.form.controls['showHidden'].value || false
  }

  submitForm(event: any) {
    event.preventDefault()
    this.loading = true
    let eaters: Eater[] = []
    this.members.forEach((member) => {
      const eater: Eater = {
        user: member.user,
        count: 0
      }
      eaters.push(eater)
    })
    const product: NewProduct = {
      eventId: this.eventId,
      title: this.form.controls['name'].value || '',
      price: this.form.controls['price'].value || 0,
      total: this.form.controls['total'].value || 0,
      buyerId: this.form.controls['buyer'].value || '',
      eaters
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

  onDelete(event: any, product: Product) {
    event.preventDefault()
    if (confirm("Точно удаляем продукт " + product.title + "?")) {
      this.loading = true
      this.productService.delete(product.id)
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

  showPopup(event: any, id: string) {
    event.preventDefault()
    this.popupX = event.pageX - 200 + 'px'
    this.popupY = event.pageY + 'px'

    this.popUpShowFlag = true
    setTimeout(() => {
      document.addEventListener('click', this.documentClickHandler)
    }, 500)

    this.productService.getOne(id)
      .subscribe({
        next: (data) => {
          this.popupEaters = data.eaters || []
          this.eatersLoading = false
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  documentClickHandler = (event: MouseEvent) => {
    if (!this.isInside(event.target as HTMLElement)) {
      this.closePopup()
    }
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.popupElement?.nativeElement
      || this.popupElement?.nativeElement.contains(elementToCheck)
    )
  }

  closePopup() {
    this.popUpShowFlag = false
    document.removeEventListener('click', this.documentClickHandler)
    this.eatersLoading = true
  }
}
