import { BASE_URL, MESSAGE_ENCODING, MESSAGE_STATUS } from '../constants'
import Recipient from './Recipient'

class Message {
  /**
   * Message UUID, only available after its created
   * @type {string} UUIDv4
   * @public
   */
  public id?: string

  /**
   * The status of a message, only available after its created
   * @type {MESSAGE_STATUS}
   * @public
   */
  public status?: MESSAGE_STATUS

  /**
   * The message encoding
   * @type {MESSAGE_ENCODING}
   * @public
   */
  public encoding?: MESSAGE_ENCODING

  /**
   * The originator of the message (number or name)
   * @type {string}
   * @public
   */
  public originator?: string

  /**
   * The actual message
   * @type {string}
   * @public
   */
  public body?: string

  /**
   * The route to send the message through
   * make sure to use a route available to you (check your dashboard)
   * @type {string}
   * @public
   */
  public route?: string

  /**
   * Not sure: displays message including reference?
   * @type {string}
   * @public
   */
  public reference?: string

  /**
   * The amount of credits charged for the message
   * @type {number}
   * @public
   */
  public credits?: number

  /**
   * The date and time the message is scheduled for
   * @type {Date}
   * @public
   */
  public scheduledAt?: Date

  /**
   * The date and time the message was created at
   * @type {Date}
   * @public
   */
  public createdAt?: Date

  /**
   * The date and time the message was updated at
   * @type {Date}
   * @public
   */
  public updatedAt?: Date

  /**
   * The recipients this message is intended for or was sent to
   * @type {Array<Recipient>}
   * @public
   */
  public recipients?: Recipient[]

  /**
   * check if request URL belongs to a Message instance
   * @param {string} request URL
   * @return {boolean}
   */
  public static isOfType(url: string) {
    return /^\/message(.*)/.test(url.replace(BASE_URL, ''))
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
