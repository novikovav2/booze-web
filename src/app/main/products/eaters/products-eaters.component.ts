import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Member} from "../../../models/member";
import {ExtendedEater} from "../../../models/eater";

@Component({
  selector: 'app-products-eaters',
  templateUrl: './products-eaters.component.html',
  styleUrls: ['./products-eaters.component.scss']
})
export class ProductsEatersComponent implements OnChanges {
  iconRightAll = faAnglesRight
  iconRight = faChevronRight
  iconLeft = faChevronLeft
  iconLeftAll = faAnglesLeft
  @Input() eaters: ExtendedEater[] = []
  @Input() members: Member[] = []
  nonEaters: ExtendedEater[] = []
  @Output() eatersChange = new EventEmitter()
  @Input() numerable: boolean = false
  @Input() total: number = 0
  @Input() readonly: boolean = false

  ngOnChanges(changes: SimpleChanges) {
    this.members.forEach((member) => {
      const exist = this.eaters.find((eater) => { return eater.user.id === member.user.id })
      if (!exist) {
        this.nonEaters.push({
          user: member.user,
          count: 0,
          selected: false
        })
      }
    })

    this.eaters = this.eaters.map((item) => {
      return {...item, selected: false }   // Add selected field to data
    })
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
        if (item.user.id === id) {
          item.selected = !item.selected
        }
      })
    } else {
      this.nonEaters.forEach((item: ExtendedEater) => {
        if (item.user.id === id) {
          item.selected = !item.selected
        }
      })
    }
  }

  plusOne(event: any, eaterId: string) {
    event.preventDefault()
    this.eaters.forEach((item) => {
      if (item.user.id === eaterId && item.count < this.total) {
        item.count++
      }
    })
  }

  minusOne(event: any, eaterId: string) {
    event.preventDefault()
    this.eaters.forEach((item) => {
      if (item.user.id === eaterId && item.count > 0) {
        item.count--
      }
    })
  }
}
