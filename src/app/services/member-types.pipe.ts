import {Pipe, PipeTransform} from "@angular/core";
import {USER_BOT, USER_BOT_HUMAN, USER_FUND, USER_FUND_HUMAN, USER_MAN, USER_MAN_HUMAN} from "./consts";

@Pipe({
  name: 'memberTypes'
})
export class MemberTypesPipe implements PipeTransform {
  transform(value?: string): string {
    switch (value) {
      case USER_BOT:
        return USER_BOT_HUMAN
      case USER_MAN:
        return USER_MAN_HUMAN
      case USER_FUND:
        return USER_FUND_HUMAN
      default:
        return ''
    }
  }
}
