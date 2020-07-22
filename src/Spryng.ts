// eslint-disable-next-line import/no-cycle
import MessageClient from './Clients/MessageClient'
// eslint-disable-next-line import/no-cycle
import BalanceClient from './Clients/BalanceClient'
import IHttpClientInterface from './Http/HttpClientInterface'

class Spryng {
  public baseUrl = 'https://rest.spryngsms.com/v1'

  public apiKey: string

  public message = new MessageClient(this)

  public balance = new BalanceClient(this)

  public httpClient?: IHttpClientInterface

  constructor(apiKey: string, httpClient?: IHttpClientInterface) {
    this.apiKey = apiKey
    this.httpClient = httpClient
  }
}

export default Spryng
