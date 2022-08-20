import {Component, OnInit} from "@angular/core";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {EventsService} from "../../services/events.service";
import {EVENT_STATUS, Event} from "../../models/event";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../main.component.scss', './index.component.scss']
})
export class IndexComponent implements OnInit{
  iconAdd = faCirclePlus
  showFlag: EVENT_STATUS = 'active'
  events: Event[] = []

  constructor(private eventService: EventsService) {}

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.eventService.getAll(this.showFlag)
      .subscribe({
        next: (data) => {
          this.events = data
        },
        error: (error) => { console.log(error) }
      })
  }

  onChangeFlag(event: any, flag: EVENT_STATUS) {
    event.preventDefault()
    this.showFlag = flag
    this.getData()
  }
}
