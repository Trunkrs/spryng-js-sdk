// eslint-disable-next-line import/no-cycle
import MessageClient from './Clients/MessageClient'
// eslint-disable-next-line import/no-cycle
import BalanceClient from './Clients/BalanceClient'

class Spryng {
  public baseUrl = 'https://rest.spryngsms.com/v1'

  public apiKey: string

  public static http: any

  constructor(apiKey: string) {
    this.apiKey = apiKey
    Spryng.http = 'test'
  }

  public message() {
    return new MessageClient(this)
  }

  public balance() {
    return new BalanceClient(this)
  }
}

export default Spryng
