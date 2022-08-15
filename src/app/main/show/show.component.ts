import {Component, OnInit} from "@angular/core";
import {EventsService} from "../../services/events.service";
import {EVENT_DEFAULT, Event, Member, NewMember} from "../../services/event.model";
import {ActivatedRoute} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-event-show',
  templateUrl: './show.component.html',
  styleUrls: ['../main.component.scss', './show.component.scss']
})
export class ShowComponent implements OnInit {
  id: string = ''
  event: Event = EVENT_DEFAULT
  members: Member[] = []
  username = new FormControl('', [Validators.required])

  constructor(private eventService: EventsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    if (this.id) {
      this.getEventData()
      this.getMembersData()
    }

  }

  getEventData() {
    this.eventService.getOne(this.id)
      .subscribe({
        next: (data) => {this.event = data},
        error: (error) => {console.log(error)}
      })
  }

  getMembersData() {
    this.eventService.getMembers(this.id)
      .subscribe({
        next: (data) => { this.members = data },
        error: (error) => { console.log(error) }
      })
  }

  addMember(event: any) {
    event.preventDefault()
    const username = this.username.value
    if (username) {
      const bot = { username }
      this.eventService.addMember(bot)
       .subscribe({
         next: () => {
           this.getMembersData()
         },
         error: (error) => { console.log(error) }
       })
    }
  }

}
