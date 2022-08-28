import {Component, OnInit} from "@angular/core";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {EventsService} from "../../services/events.service";
import {EVENT_STATUS, Event} from "../../models/event";
import {MSG_ERROR, NEW} from "../../services/consts";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../main.component.scss', './index.component.scss']
})
export class IndexComponent implements OnInit{
  iconAdd = faCirclePlus
  showFlag: EVENT_STATUS = 'active'
  events: Event[] = []
  NEW = NEW

  constructor(private eventService: EventsService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.eventService.getAll(this.showFlag)
      .subscribe({
        next: (data) => {
          this.events = data
          console.log(data)
        },
        error: (error) => {
          this.toastr.error(MSG_ERROR)
          console.log(error)
        }
      })
  }

  onChangeFlag(event: any, flag: EVENT_STATUS) {
    event.preventDefault()
    this.showFlag = flag
    this.getData()
  }

  parseDate(str: string) {
    return new Date(+str * 1000)
  }
}
