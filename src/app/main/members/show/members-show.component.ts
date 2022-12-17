import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {
  MAIN_URL,
  EVENTS,
  MSG_ERROR,
  MSG_MEMBER_DELETED,
  MSG_MEMBER_DELETE_FAILED,
  MSG_MEMBER_UPDATED, USER_BOT
} from "../../../services/consts";
import {Member, MEMBER_DEFAULT} from "../../../models/member";
import {MembersService} from "../../../services/members.service";
import {EventsService} from "../../../services/events.service";
import {ProductsService} from "../../../services/products.service";
import {MemberProduct} from "../../../models/product";

@Component({
  selector: 'app-members-show',
  templateUrl: './members-show.component.html',
  styleUrls: ['../../main.component.scss', './members-show.component.scss']
})
export class MembersShowComponent implements OnInit {
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS
  member: Member = MEMBER_DEFAULT
  saveTxt = 'Сохранить'
  readonly = false
  loading = false
  loadingProducts = false
  memberProducts: MemberProduct[] = []
  USER_BOT = USER_BOT

  constructor(private route: ActivatedRoute,
              private toastr: ToastrService,
              private memberService: MembersService,
              private eventService: EventsService,
              private router: Router,
              private productService: ProductsService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.getData(id)
    }
  }

  getData(id: string) {
    this.loading = true
    this.memberService.getOne(id)
      .subscribe({
        next: (data) => {
          this.member = data
          this.getEvent(data.eventId)
          this.loading = false
          this.getProductData(data.id)
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
          this.loading = false
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

  getProductData(memberId: string) {
    this.loadingProducts = true
    this.productService.getMembersProducts(memberId)
      .subscribe({
        next: (data) => {
          this.memberProducts = data
          this.loadingProducts = false
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
          this.loadingProducts = false
        }
      })
  }

  onSave() {
    this.saveTxt = 'Сохраняется...'
    this.updateProducts()
  }

  updateProducts() {
    this.productService.updateMembersProducts(this.member.id, this.memberProducts)
      .subscribe({
        next: () => {
          this.updateMember()
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  updateMember() {
    this.memberService.update(this.member)
      .subscribe({
        next: () => {
          this.toastr.success(MSG_MEMBER_UPDATED)
          this.router.navigate([MAIN_URL, EVENTS, this.member.eventId])
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
          this.saveTxt = 'Сохранить'
        }
      })
  }

  onCancel() {
    this.router.navigate([MAIN_URL, EVENTS, this.member.eventId])
  }

  onDelete() {
    if (confirm("Вы уверены, что хотите удалить участника " + this.member.user.username + "?")) {
      this.memberService.remove(this.member.id)
        .subscribe({
          next: () => {
            this.toastr.success(MSG_MEMBER_DELETED)
            this.router.navigate([MAIN_URL, EVENTS, this.member.eventId])
          },
          error: (error) => {
            this.toastr.error(MSG_MEMBER_DELETE_FAILED, MSG_ERROR)
            console.log(error)
          }
        })
    }
  }
}
