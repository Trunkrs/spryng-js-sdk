import Message from './Message'

class MessageCollection {
  public total?: number

  public perPage?: number

  public currentPage?: number

  public lastPage?: number

  public nextPageUrl?: string

  public prevPageUrl?: string

  public from?: number

  public to?: number

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
