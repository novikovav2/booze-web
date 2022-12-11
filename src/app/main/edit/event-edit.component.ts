import {Component, OnInit} from "@angular/core";
import {EventsService} from "../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Event, EVENT_DEFAULT, EventNew} from "../../models/event";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EVENTS, MAIN_URL, MSG_ERROR, MSG_EVENT_EDITED} from "../../services/consts";
import {ToastrService} from "ngx-toastr";
import {DateAdapter} from "@angular/material/core";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['../main.component.scss']
})
export class EventEditComponent implements OnInit {
  id: string = ''
  event: Event = EVENT_DEFAULT
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS
  loading = false
  loggedIn = false

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    eventedAt: new FormControl(''),
    reason: new FormControl(''),
    isPublic: new FormControl(true),
    isArchive: new FormControl(true),
    withCommonMoney: new FormControl(false)
  })

  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private _adapter: DateAdapter<any>,
              private authService: AuthService) {
    this._adapter.setLocale('ru')
  }

  ngOnInit() {
    this.loggedIn = !!this.authService.getToken()
    this.id = this.route.snapshot.paramMap.get('id') || ''
    if (this.id) {
      this.loading = true
      this.eventService.getOne(this.id)
        .subscribe({
          next: (data) => {
            this.event = data
            this.form.controls['title'].setValue(data.title)
            this.form.controls['eventedAt']
              .setValue(data.evented_at)
            this.form.controls['reason'].setValue(data.reason)
            this.form.controls['isPublic'].setValue(data.isPublic)
            this.form.controls['isArchive'].setValue(data.status === 'archive')
            this.loading = false
          },
          error: (error) => {
            this.toastr.error(MSG_ERROR)
            console.log(error)
          }
        })
    }
  }

  onSubmit() {
    const title = this.form.controls['title'].value
    if (title) {
      const event: EventNew = {
        title: title,
        evented_at: this.form.controls['eventedAt'].value || '',
        reason: this.form.controls['reason'].value || '',
        isPublic: this.form.controls['isPublic'].value,
        status: this.form.controls['isArchive'].value ?  'archive' : 'active',
        withCommonMoney: this.form.controls['withCommonMoney'].value || false
      }
      this.eventService.update(this.id, event)
        .subscribe({
          next: () => {
            this.toastr.success(MSG_EVENT_EDITED)
            this.router.navigate([MAIN_URL, EVENTS, this.id])
          },
          error: (error) => {
            this.toastr.error(MSG_ERROR)
            console.log(error)
          }
        })
    }

  }

}
