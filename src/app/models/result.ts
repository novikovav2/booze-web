import {User} from "./user";

export interface Payment {
  recipient: User,
  value: number
}

export interface Donor {
  user: User,
  payments: Payment[],
  totalAte: number
}

export interface Recipient {
  user: User,
  totalPaid: number,
  totalAte: number
}

export interface Result {
  eventId: string,
  recipients: Recipient[],
  donors: Donor[]
}

export const RESULT_DEFAULT: Result = {
  eventId: '',
  recipients: [ ],
  donors: [
    {
      user: { id: '', username: '', type: 'bot' },
      payments: [{
        recipient: {id: '', username: ''},
        value: 0
      }],
      totalAte: 0
    },
    {
      user: { id: '', username: '', type: 'bot' },
      payments: [{
        recipient: {id: '', username: ''},
        value: 0
      }],
      totalAte: 0
    }
  ]
}
