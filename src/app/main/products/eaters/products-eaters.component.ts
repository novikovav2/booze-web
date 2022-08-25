import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Member} from "../../../models/member";

@Component({
  selector: 'app-products-eaters',
  templateUrl: './products-eaters.component.html',
  styleUrls: ['./products-eaters.component.scss']
})
export class ProductsEatersComponent implements OnInit {
  iconRightAll = faAnglesRight
  iconRight = faChevronRight
  iconLeft = faChevronLeft
  iconLeftAll = faAnglesLeft
  @Input() eaters: any[] = []
  @Input() members: Member[] = []
  nonEaters: any[] = []
  @Output() eatersChange = new EventEmitter()
  @Input() numerable: boolean = false
  @Input() total: number = 0

  ngOnInit() {
    if (this.eaters.length > 0 && this.members.length > 0) {
      this.members.forEach((member) => {
        const exist = this.eaters.find((eater) => { return eater.id === member.id })
        if (!exist) {
          this.nonEaters.push({
            id: member.id,
            username: member.user.username,
            selected: false
          })
        }
      })

      this.eaters = this.eaters.map((item) => {
        return {...item, selected: false }   // Add selected field to data
      })
    }
  }


  allToRight() {
    this.eaters.forEach((item) => {
      this.nonEaters.push({
        ...item,
        selected: false
      })
    })
    this.eaters = []
    this.eatersChange.emit(this.eaters)
  }

  selectedToRight() {
    const newEaters: any[] = []
    this.eaters.forEach((item) => {
      if (item.selected) {
        this.nonEaters.push({
          ...item,
          selected: false
        })
      } else {
        newEaters.push(item)
      }
    })
    this.eaters = newEaters
    this.eatersChange.emit(this.eaters)
  }

  selectedToLeft() {
    const newNonEaters: any[] = []
    this.nonEaters.forEach((item) => {
      if (item.selected) {
        this.eaters.push({
          ...item,
          selected: false
        })
      } else {
        newNonEaters.push(item)
      }
    })
    this.nonEaters = newNonEaters
    this.eatersChange.emit(this.eaters)
  }

  allToLeft() {
    this.nonEaters.forEach((item) => {
      this.eaters.push({
        ...item,
        selected: false
      })
    })
    this.nonEaters = []
    this.eatersChange.emit(this.eaters)
  }

  onClick(id: string, type: string) {
    if (type === 'eaters') {
      this.eaters.forEach((item) => {
        if (item.id === id) {
          item.selected = !item.selected
        }
      })
    } else {
      this.nonEaters.forEach((item: any) => {
        if (item.id === id) {
          item.selected = !item.selected
        }
      })
    }
  }

  plusOne(event: any, eaterId: string) {
    event.preventDefault()
    this.eaters.forEach((item) => {
      if (item.id === eaterId && item.count < this.total) {
        item.count++
      }
    })
  }

  minusOne(event: any, eaterId: string) {
    event.preventDefault()
    this.eaters.forEach((item) => {
      if (item.id === eaterId && item.count > 0) {
        item.count--
      }
    })
  }
}
