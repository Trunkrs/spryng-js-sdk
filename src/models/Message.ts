import { MESSAGE_ENCODING, MESSAGE_STATUS } from '../constants'
import Recipient from './Recipient'

class Message {
  public id?: string

  public status?: MESSAGE_STATUS

  public encoding?: MESSAGE_ENCODING

  public originator?: string

  public body?: string

  public route?: string

  public reference?: string

  public credits?: number

  public scheduledAt?: Date

  public createdAt?: Date

  public updatedAt?: Date

  public recipients?:
    | Array<{
        number: string
        status: MESSAGE_STATUS
        sentAt: Date
      }>
    | string[]

  /**
   * check if request URL belongs to a Message instance
   * @param {string} request URL
   * @return {boolean}
   */
  public static isOfType(url: string) {
    return /^\/message(.*)/.test(url)
  }

  /**
   * convert a raw axios response body to a Message instance
   * @param {object} raw axios response body
   * @return {Message}
   */
  public static deserialize(rawBody: any): Message {
    const message = new Message()
    message.id = rawBody.id
    message.status = rawBody.status
    message.encoding = rawBody.encoding
    message.originator = rawBody.originnator
    message.body = rawBody.body
    message.reference = rawBody.reference
    message.credits = rawBody.credits
    message.scheduledAt = new Date(rawBody.scheduled_at)
    message.createdAt = new Date(rawBody.created_at)
    message.updatedAt = new Date(rawBody.updated_at)
    message.recipients = (rawBody.recipients || []).map(Recipient.deserialize)
    return message
  }
}

export default Message
