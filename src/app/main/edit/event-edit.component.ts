import {Component, OnInit} from "@angular/core";
import {EventsService} from "../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Event, EVENT_DEFAULT, EventNew} from "../../models/event";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EVENTS, MAIN_URL, MSG_ERROR, MSG_EVENT_EDITED} from "../../services/consts";
import {ToastrService} from "ngx-toastr";

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

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    eventedAt: new FormControl(''),
    reason: new FormControl(''),
    isPublic: new FormControl(true),
    isActive: new FormControl(true)
  })

  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    if (this.id) {
      this.eventService.getOne(this.id)
        .subscribe({
          next: (data) => {
            this.event = data
            this.form.controls['title'].setValue(data.title)
            this.form.controls['eventedAt'].setValue(data.evented_at)
            this.form.controls['reason'].setValue(data.reason)
            this.form.controls['isPublic'].setValue(data.isPublic)
            this.form.controls['isActive'].setValue(data.status !== 'active')
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
      const date = new Date(this.form.controls['eventedAt'].value || '',)
      const event: EventNew = {
        title: title,
        evented_at: date.toJSON(),
        reason: this.form.controls['reason'].value || '',
        isPublic: this.form.controls['isPublic'].value || true,
        status: this.form.controls['isActive'].value ? 'active' : 'archive'
      }
      this.eventService.update(event)
        .subscribe({
          next: (data) => {
            this.toastr.success(MSG_EVENT_EDITED)
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
