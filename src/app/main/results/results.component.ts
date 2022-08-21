import {Component, OnInit} from "@angular/core";
import {EventsService} from "../../services/events.service";
import {ActivatedRoute} from "@angular/router";
import {Result, RESULT_DEFAULT} from "../../models/result";
import {MAIN_URL, EVENTS} from "../../services/consts";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['../main.component.scss']
})
export class ResultsComponent implements OnInit {
  id: string = ''
  result: Result = RESULT_DEFAULT
  MAIN_URL = MAIN_URL
  EVENTS = EVENTS

  constructor(private eventService: EventsService,
              private route: ActivatedRoute) {  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    if (this.id) {
      this.eventService.getResult(this.id)
        .subscribe({
          next: (data) => {
            this.result = data
          },
          error: (error) => { console.log(error) }
        })
    }
  }

}
