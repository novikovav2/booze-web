import {Component, OnInit} from "@angular/core";
import {EventsService} from "../../services/events.service";
import {EVENT_DEFAULT, Event, Member} from "../../services/event.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {
  EDIT,
  EVENTS,
  MAIN_URL,
  MSG_ERROR,
  MSG_EVENT_DELETED,
  MSG_MEMBER_ADDED,
  MSG_MEMBER_DELETED,
  RESULTS
} from "../../services/consts";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {ToastrService} from "ngx-toastr";

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
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS
  EDIT = EDIT
  RESULTS = RESULTS
  iconTrash = faTrash

  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
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
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  getMembersData() {
    this.eventService.getMembers(this.id)
      .subscribe({
        next: (data) => { this.members = data },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
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
           this.toastr.success(MSG_MEMBER_ADDED)
           this.getMembersData()
         },
         error: (error) => {
           this.toastr.error(MSG_ERROR)
           console.log(error)
         }
       })
    }
  }

  deleteMember(memberId: string) {
    this.eventService.removeMember(memberId, this.id)
      .subscribe({
        next: () => {
          this.toastr.success(MSG_MEMBER_DELETED)
          this.getMembersData()
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  onDelete() {
    this.eventService.deleteEvent(this.id)
      .subscribe({
        next: () => {
          this.toastr.success(MSG_EVENT_DELETED)
          this.router.navigate([MAIN_URL, EVENTS])
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

}
