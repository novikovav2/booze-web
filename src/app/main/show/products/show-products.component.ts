import {Component, Input, OnInit} from "@angular/core";
import {Member, Product} from "../../../services/event.model";
import {ProductsService} from "../../../services/products.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";

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
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    buyer: new FormControl('', [Validators.required]),
    showHidden: new FormControl(false),
    total: new FormControl(0)
  })

  constructor(private productService: ProductsService) {
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
    console.log("SUBMIT")
  }

}
