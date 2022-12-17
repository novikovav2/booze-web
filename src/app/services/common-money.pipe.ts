import {Pipe, PipeTransform} from "@angular/core";
import {TXT_WITH_COMMON_MONEY, TXT_WITHOUT_COMMON_MONEY} from "./consts";

@Pipe({ name: 'commonMoney' })
export class CommonMoneyPipe implements PipeTransform {
  transform(value: boolean ): string {
    return value ? TXT_WITH_COMMON_MONEY : TXT_WITHOUT_COMMON_MONEY
  }
}
