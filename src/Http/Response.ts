import { AxiosResponse, AxiosError } from 'axios'
import Message from '../Models/Message'
import MessageCollection from '../Models/MessageCollection'
import Balance from '../Models/Balance'
import ApiError from '../Models/ApiError'

class Response {
  protected rawResponse: Partial<AxiosResponse & AxiosError>

  constructor(rawResponse: AxiosResponse | AxiosError) {
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
    return ApiError.deserialize(this.rawResponse as AxiosError)
  }
}

export default Response
