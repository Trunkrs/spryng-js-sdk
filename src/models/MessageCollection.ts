import Message from './Message'

/**
 * A collection is returned when you fetch a list of messages
 */
class MessageCollection {
  /**
   * Total number of messages
   * @type {number}
   * @public
   */
  public total?: number

  /**
   * Messages per page
   * @type {number}
   * @public
   */
  public perPage?: number

  /**
   * Current page you are on
   * @type {number}
   * @public
   */
  public currentPage?: number

  /**
   * The last page of the collection
   * @type {number}
   * @public
   */
  public lastPage?: number

  /**
   * The URL to the next page
   * @type {string}
   * @public
   */
  public nextPageUrl?: string

  /**
   * The URL to the previous page
   * @type {string}
   * @public
   */
  public prevPageUrl?: string

  /**
   * From which number the message are shown
   * @type {number}
   * @public
   */
  public from?: number

  /**
   * Up to which number the messages are shown
   * @type {number}
   * @public
   */
  public to?: number

  /**
   * The array of the actual messages
   * @type {Array<Message>}
   * @public
   */
  public data: Message[] = []

  /**
   * convert a raw Axios response body into a MessageCollection instance
   * @param {object} raw axios response body
   * @return {MessageCollection}
   */
  static deserialize(rawBody: any): MessageCollection {
    const messageCollection = new MessageCollection()
    messageCollection.total = rawBody.total
    messageCollection.perPage = rawBody.per_page
    messageCollection.currentPage = rawBody.current_page
    messageCollection.lastPage = rawBody.last_page
    messageCollection.nextPageUrl = rawBody.next_page_url
    messageCollection.prevPageUrl = rawBody.prev_page_url
    messageCollection.from = rawBody.from
    messageCollection.to = rawBody.to
    messageCollection.data = rawBody.data.map(Message.deserialize)
    return messageCollection
  }
}

export default MessageCollection
