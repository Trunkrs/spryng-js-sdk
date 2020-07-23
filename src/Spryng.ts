// eslint-disable-next-line import/no-cycle
import MessageClient from './clients/MessageClient'
// eslint-disable-next-line import/no-cycle
import BalanceClient from './clients/BalanceClient'
import IHttpClientInterface from './http/HttpClientInterface'

class Spryng {
  /**
   * The base URL of the api
   * @type {string}
   * @public
   */
  public baseUrl = 'https://rest.spryngsms.com/v1'

  /**
   * Your api key, will be added as Bearer to all requests
   * @type {string}
   * @public
   */
  public apiKey: string

  /**
   * The message client, handles all message requests
   * @type {MessageClient}
   * @public
   */
  public message = new MessageClient(this)

  /**
   * The balance client, handles all balance requests
   * @type {Balance}
   * @public
   */
  public balance = new BalanceClient(this)

  /**
   * The HttpClient, if not set Axios will be used (make sure to install it!)
   * @type {IHttpClientInterface}
   * @public
   */
  public httpClient?: IHttpClientInterface

  constructor(apiKey: string, httpClient?: IHttpClientInterface) {
    this.apiKey = apiKey
    this.httpClient = httpClient
  }
}

export default Spryng
