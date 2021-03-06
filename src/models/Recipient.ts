import { MESSAGE_STATUS } from '../constants'

interface IRecipientResponse {
  number: string
  status: string
  // eslint-disable-next-line camelcase
  sent_at: string
}

/**
 * A Recipient the message is intended or sent to
 */
class Recipient {
  /**
   * Phone number. Should start with country code, but without the + or 00 (eg. 31612345678 for a dutch number)
   * @type {string}
   * @public
   */
  public number: string

  /**
   * The status of the message sent to this recipient
   * @type {string}
   * @public
   */
  public status?: MESSAGE_STATUS

  /**
   * The date and time on which this message was sent
   * @type {Date}
   * @public
   */
  public sentAt?: Date

  /**
   * Deserialize the raw body into a Recipient instance
   * @param rawResponse
   * @return {Recipient}
   */
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
