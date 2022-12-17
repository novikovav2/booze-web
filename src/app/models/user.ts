import {USER_BOT, USER_FUND, USER_MAN} from "../services/consts";

export type UserType = typeof USER_MAN | typeof USER_BOT | typeof USER_FUND
export interface User {
  id: string,
  username: string,
  type?: UserType
}
