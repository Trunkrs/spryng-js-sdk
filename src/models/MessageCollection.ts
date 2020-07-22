import Message from './Message'

class MessageCollection {
  public total: number

  public perPage: number

  public currentPage: number

  public lastPage: number

  public nextPageUrl: string

  public prevPageUrl: string

  public from: number

  public to: number

  public data: Message[]

  /**
   * convert a raw Axios response body into a MessageCollection instance
   * @param {object} raw axios response body
   * @return {MessageCollection}
   */
  static deserialize(rawBody: any): MessageCollection {
    return new MessageCollection(
      rawBody.total,
      rawBody.per_page,
      rawBody.current_page,
      rawBody.last_page,
      rawBody.next_page_url,
      rawBody.prev_page_url,
      rawBody.from,
      rawBody.to,
      rawBody.data.map(Message.deserialize),
    )
  }

  constructor(
    total: number,
    perPage: number,
    currentPage: number,
    lastPage: number,
    nextPageUrl: string,
    prevPageUrl: string,
    from: number,
    to: number,
    data: Message[],
  ) {
    this.total = total
    this.perPage = perPage
    this.currentPage = currentPage
    this.lastPage = lastPage
    this.nextPageUrl = nextPageUrl
    this.prevPageUrl = prevPageUrl
    this.from = from
    this.to = to
    this.data = data
  }
}

export default MessageCollection
