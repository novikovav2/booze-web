import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EVENTS, MAIN_URL} from "../../services/consts"
import {EventsService} from "../../services/events.service";
import {EventNew} from "../../models/event";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['../main.component.scss', './event-new.component.scss']
})
export  class EventNewComponent {
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    eventedAt: new FormControl(''),
    reason: new FormControl('')
  })

  constructor(private eventService: EventsService,
              private router: Router) {  }

  onSubmit() {
    const title = this.form.controls['title'].value
    const evented_at = this.form.controls['eventedAt'].value || ''
    const reason = this.form.controls['reason'].value || ''
    if (title) {
      const eventNew: EventNew = { title, evented_at, reason }
      this.eventService.addEvent(eventNew)
        .subscribe({
          next: (data) => {
            this.router.navigate([MAIN_URL, EVENTS, data.id])
          },
          error: (error) => { console.log(error) }
        })
    }
  }

}
