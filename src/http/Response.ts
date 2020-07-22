import Message from '../models/Message'
import MessageCollection from '../models/MessageCollection'
import Balance from '../models/Balance'
import ApiError from '../models/ApiError'
import { IHttpClientError, IHttpClientResponse } from './HttpClientInterface'

class Response {
  protected rawResponse: Partial<IHttpClientResponse & IHttpClientError>

  constructor(rawResponse: IHttpClientResponse | IHttpClientError) {
    this.rawResponse = rawResponse
  }

  /**
   * check if request was succesfull
   * @return {boolean}
   */
  public wasSuccesful() {
    return (
      !this.rawResponse.isAxiosError &&
      this.rawResponse.status &&
      this.rawResponse.status >= 200 &&
      this.rawResponse.status < 300
    )
  }

  /**
   * convert a response to a usable instance of Message, MessageCollection or Balance
   * @return {Promise<void|Message|MessageCollection|Balance>}
   */
  public toObject() {
    if (this.wasSuccesful()) {
      if (Message.isOfType(this.rawResponse.config!.url as string)) {
        return !this.rawResponse.data.total
          ? Message.deserialize(this.rawResponse.data)
          : MessageCollection.deserialize(this.rawResponse.data)
      }
      if (Balance.isOfType(this.rawResponse.config!.url as string)) {
        return Balance.deserialize(this.rawResponse.data)
      }
    }
    return ApiError.deserialize(this.rawResponse as IHttpClientError)
  }
}

export default Response
