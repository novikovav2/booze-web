import {Component, OnInit} from "@angular/core";
import {EventsService} from "../../services/events.service";
import {Member, NewMember} from "../../models/member";
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
import {Event, EVENT_DEFAULT} from "../../models/event"
import {AuthService} from "../../services/auth.service";

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
  loadingEvent = false
  loadingMembers = true
  loggedIn = false
  returnLinks: string[] = []
  eventTitle = ''
  unauthorized = false

  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private authService: AuthService) {
    this.loggedIn = !!this.authService.getToken()
    if (this.loggedIn) {
      this.returnLinks = [MAIN_URL, EVENTS]
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    if (this.id) {
      this.getEventData()
    }

  }

  getEventData() {
    this.loadingEvent = true
    this.eventService.getOne(this.id)
      .subscribe({
        next: (data) => {
          this.getMembersData()
          this.event = data
          this.eventTitle = this.event.status === 'archive' ?
                              `${this.event.title} (архив)` : this.event.title
          this.loadingEvent = false
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
          if (error.status === 401) {
            this.unauthorized = true
          }
        }
      })
  }

  getMembersData() {
    this.loadingMembers = true
    this.eventService.getMembers(this.id)
      .subscribe({
        next: (data) => {
          this.members = data
          this.loadingMembers = false
        },
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
      const bot = {
        eventId: this.id,
        username
      }
      this.eventService.addMember(bot)
       .subscribe({
         next: () => {
           this.toastr.success(MSG_MEMBER_ADDED)
           this.getMembersData()
           this.username.reset()
         },
         error: (error) => {
           this.toastr.error(MSG_ERROR)
           console.log(error)
         }
       })
    }
  }

  deleteMember(memberId: string) {
    this.eventService.removeMember(memberId)
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

  parseDate(str: string) {
    return new Date(str)
  }

  join(e: any) {
    e.preventDefault()
    this.loadingMembers = true
    const newMember: NewMember = {
      eventId: this.event.id
    }
    this.eventService.join(newMember)
      .subscribe({
        next: () => {
          this.toastr.success(MSG_MEMBER_ADDED)
          this.getMembersData()
        },
        error: (error) => {
          console.log(error)
          this.toastr.error(MSG_ERROR)
          this.loadingMembers = false
        }
      })
  }

}
