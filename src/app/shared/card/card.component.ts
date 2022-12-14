import {Component, Input} from "@angular/core";
import {faCircleLeft} from "@fortawesome/free-regular-svg-icons";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title = ''
  @Input() isTitle: boolean = false
  @Input() returnLink: any[] = []
  iconBack = faCircleLeft
  @Input() loading = false
  spinner = faSpinner
}
