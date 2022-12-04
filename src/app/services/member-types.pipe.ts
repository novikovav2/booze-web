import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'memberTypes'
})
export class MemberTypesPipe implements PipeTransform {
  transform(value?: string): string {
    if (value) {
      return value === 'bot' ? 'Бот' : 'Зарегистрированый пользователь'
    } else {
      return ''
    }
  }
}
