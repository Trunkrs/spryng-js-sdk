// eslint-disable-next-line import/no-cycle
import BaseClient from './BaseClient'
import { HTTP_METHOD } from '../constants'
import Request from '../http/Request'
import Message from '../models/Message'
import HttpClient from '../http/HttpClient'
import MessageCollection from '../models/MessageCollection'

type FILTERS_KEYS =
  | 'originator'
  | 'recipient_number'
  | 'reference'
  | 'created_from'
  | 'created_until'
  | 'scheduled_from'
  | 'scheduled_until'
  | 'status'

/**
 * Client which exposes the HTTP methods available for Messages
 */
class MessageClient extends BaseClient {
  /**
   * Allowed filters
   */
  private static listFilters: FILTERS_KEYS[] = [
    'originator',
    'recipient_number',
    'reference',
    'created_from',
    'created_until',
    'scheduled_from',
    'scheduled_until',
    'status',
  ]

  /**
   * Send a new text message
   * @param {Message} message instance to send
   * @return {Promise<Message>} returns a Message instance
   */
  public create(message: Message) {
    if (!message.originator || !message.body || !message.recipients) {
      throw new Error(`An originator, recipient and body are required`)
    }
    const request = new Request(this.api.baseUrl, HTTP_METHOD.POST, '/messages')
    request.withBearerToken(this.api.apiKey)
    request.addParameter('encoding', message.encoding)
    request.addParameter('body', message.body)
    request.addParameter('route', message.route)
    request.addParameter('originator', message.originator)
    request.addParameter(
      'recipients',
      message.recipients.map((recipient) => recipient.number),
    )
    request.addParameter('reference', message.reference)
    if (message.scheduledAt) {
      request.addParameter('scheduled_at', message.scheduledAt.toISOString())
    }
    return new HttpClient(request, this.api.httpClient).send() as Promise<
      Message
    >
  }

  /**
   * List the send messages
   * @param {object} filters, the keys of which must be part of MessageClient.listFilters
   * @return {Promise<MessageCollection>} returns an instance of MessageCollection
   */
  public list(filters: { [key in FILTERS_KEYS]?: string } = {}) {
    const request = new Request(this.api.baseUrl, HTTP_METHOD.GET, '/messages')
    request.withBearerToken(this.api.apiKey)
    const filterKeys = Object.keys(filters) as FILTERS_KEYS[]
    filterKeys.forEach((filterKey) => {
      if (!Object.prototype.hasOwnProperty.call(filters, filterKey)) {
        throw new Error(`${filterKey} is not a valid filter`)
      }
      request.addQueryStringParameter(filterKey, filters[filterKey])
    })
    return new HttpClient(request, this.api.httpClient).send() as Promise<
      MessageCollection
    >
  }

  /**
   * Get a specific message by message UUID
   * @param {string} message UUID
   * @return {Promise<Message>} returns a message instance
   */
  public show(id: string) {
    const request = new Request(
      this.api.baseUrl,
      HTTP_METHOD.GET,
      `/messages/${id}`,
    )
    request.withBearerToken(this.api.apiKey)
    return new HttpClient(request, this.api.httpClient).send() as Promise<
      Message
    >
  }

  /**
   * Cancel a specific message by message UUID
   * @param {string} message UUID
   */
  public async cancel(id: string): Promise<void> {
    const request = new Request(
      this.api.baseUrl,
      HTTP_METHOD.POST,
      `/messages/${id}/cancel`,
    )
    request.withBearerToken(this.api.apiKey)
    await new HttpClient(request, this.api.httpClient).send()
  }
}

export default MessageClient
