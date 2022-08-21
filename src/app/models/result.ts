import {User} from "./user";

export interface Payment {
  recipient: User,
  value: number
}

export interface Donor {
  donor: User,
  payments: Payment[]
}

export interface Result {
  eventId: string,
  recipients: User[],
  donors: Donor[]
}

export const RESULT_DEFAULT: Result = {
  eventId: '',
  recipients: [
    {id: '', username: ''}
  ],
  donors: [
    {
      donor: { id: '', username: '' },
      payments: [{
        recipient: {id: '', username: ''},
        value: 100
      }]
    },
    {
      donor: { id: '', username: '' },
      payments: [{
        recipient: {id: '', username: ''},
        value: 200
      }]
    }
  ]
}
