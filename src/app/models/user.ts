export type UserType = 'man' | 'bot'
export interface User {
  id: string,
  username: string,
  type?: UserType
}
