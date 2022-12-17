import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MembersService} from "../../../services/members.service";
import {EVENTS, MAIN_URL, MSG_ERROR, MSG_FUND_UPDATED, USER_FUND} from "../../../services/consts";
import {Member} from "../../../models/member";

@Component({
  selector: 'app-common-money',
  templateUrl: './common-money.component.html',
  styleUrls: ['../../main.component.scss']
})
export class CommonMoneyComponent implements OnInit {
  eventId: string = ''            // eventId
  loadingData = false
  fund: Member = {} as Member
  members: Member[] = []
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS
  USER_FUND = USER_FUND
  saveTxt = 'Сохранить'
  sum = 0

  constructor(private route: ActivatedRoute,
              private toastr: ToastrService,
              private memberService: MembersService,
              private router: Router) {
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id') || ''
    if (this.eventId) {
      this.getMemberData()
    }
  }

  getMemberData() {
    this.loadingData = true
    this.memberService.getAll(this.eventId)
      .subscribe({
        next: (data) => {
          this.members = data
          this.sum = data.reduce((accumulate, item) => {
            const money = item.money ? item.money : 0
            return accumulate + money
          }, 0)
          this.loadingData = false
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
          this.loadingData = false
        }
      })
  }



  onSave() {
    this.saveTxt = 'Сохраняется...'
    // this.sum = this.members.reduce((accumulate, item) => {
    //   const money = item.money ? item.money : 0
    //   return accumulate + money
    // }, 0)

    this.memberService.updateMoney(this.eventId, this.members)
      .subscribe({
        next: () => {
          this.toastr.success(MSG_FUND_UPDATED)
          this.getMemberData()
          this.saveTxt = 'Сохранить'
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
          this.saveTxt = 'Сохранить'
        }
      })
  }

  onCancel() {
    this.router.navigate([MAIN_URL, EVENTS, this.eventId])
  }
}
