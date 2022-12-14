import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EVENTS, MAIN_URL, MSG_ERROR, MSG_EVENT_CREATED} from "../../services/consts"
import {EventsService} from "../../services/events.service";
import {EVENT_STATUS, EventNew} from "../../models/event";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['../main.component.scss']
})
export  class EventNewComponent {
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    eventedAt: new FormControl(''),
    reason: new FormControl(''),
    isPublic: new FormControl(true),
    withCommonMoney: new FormControl(false)
  })

  constructor(private eventService: EventsService,
              private router: Router,
              private toastr: ToastrService,
              private _adapter: DateAdapter<any>) {
    this._adapter.setLocale('ru')
  }

  onSubmit() {
    const title = this.form.controls['title'].value
    const date = new Date(this.form.controls['eventedAt'].value || '')
    const evented_at = date.toJSON()
    const reason = this.form.controls['reason'].value || ''
    const isPublic = this.form.controls['isPublic'].value || true
    const status: EVENT_STATUS = 'active'
    const withCommonMoney = this.form.controls['withCommonMoney'].value || false
    if (title) {
      const eventNew: EventNew = { title, evented_at, reason, isPublic,
          status, withCommonMoney }
      this.eventService.addEvent(eventNew)
        .subscribe({
          next: (data) => {
            this.toastr.success(MSG_EVENT_CREATED)
            this.router.navigate([MAIN_URL, EVENTS, data.id])
          },
          error: (error) => {
            this.toastr.error(MSG_ERROR)
            console.log(error)
          }
        })
    }
  }

}
