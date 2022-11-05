import {Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from "@angular/core";
import {ProductsService} from "../../../../services/products.service";
import {Eater} from "../../../../models/product";

@Component({
  selector: 'app-products-popup',
  templateUrl: './products-popup.component.html',
  styleUrls: ['./products-popup.component.scss']
})
export class ProductsPopupComponent implements OnChanges{
  @Input() productId = ''
  @Input() show = false
  currentShow = false
  eaters: Eater[] = []
  spinnerShow = false
  errorShow = false

  constructor(private productService: ProductsService,
              private eRef: ElementRef) {  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.show && this.productId) {
      this.getData()
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    console.log(this.show, this.currentShow)
    if(!this.eRef.nativeElement.contains(event.target) && this.currentShow) {
      this.show = false
      this.currentShow = false
    }
  }

  getData() {
    this.spinnerShow = true
    this.productService.getEaters(this.productId)
      .subscribe({
        next: (data) => {
          this.eaters = data
          this.spinnerShow = false
          this.errorShow = false
          this.currentShow = true
        },
        error: () => {
          this.errorShow = true
          this.spinnerShow = false
        }
      })
  }

}
