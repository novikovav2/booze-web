import {Component, OnInit} from "@angular/core";
import {EventsService} from "../../services/events.service";
import {ActivatedRoute} from "@angular/router";
import {Result, RESULT_DEFAULT} from "../../models/result";
import {MAIN_URL, EVENTS, MSG_ERROR, USER_FUND} from "../../services/consts";
import {ToastrService} from "ngx-toastr";

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
  loading = false
  USER_FUND = USER_FUND

  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    if (this.id) {
      this.loading = true
      this.eventService.getResult(this.id)
        .subscribe({
          next: (data) => {
            this.result = data
            this.loading = false
          },
          error: (error) => {
            this.toastr.error(MSG_ERROR)
            console.log(error)
          }
        })
    }
  }

}
