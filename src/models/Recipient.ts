import { MESSAGE_STATUS } from '../constants'

interface IRecipientResponse {
  number: string
  status: string
  // eslint-disable-next-line camelcase
  sent_at: string
}

class Recipient {
  public number: string

  public status?: MESSAGE_STATUS

  public sentAt?: Date

  public static deserialize(rawResponse: any) {
    return new Recipient(rawResponse)
  }

  constructor(params: string | IRecipientResponse) {
    if (typeof params === 'string') {
      this.number = params
    } else {
      if (
        !Object.prototype.hasOwnProperty.call(MESSAGE_STATUS, params.status)
      ) {
        throw new Error(`Invalid message status ${params.status}`)
      }
      this.number = params.number
      this.status = params.status as MESSAGE_STATUS
      this.sentAt = new Date(params.sent_at)
    }
  }
}

export default Recipient
