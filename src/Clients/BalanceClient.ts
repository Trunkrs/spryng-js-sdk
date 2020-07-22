import Request from '../Http/Request'
// eslint-disable-next-line import/no-cycle
import BaseClient from './BaseClient'
import { HTTP_METHOD } from '../constants'
import HttpClient from '../Http/HttpClient'
import Balance from '../Models/Balance'

class BalanceClient extends BaseClient {
  /**
   * Get the current balance
   * @return {Promise<Balance>} balance instance
   */
  public get() {
    const request = new Request(this.api.baseUrl, HTTP_METHOD.GET, '/balance')
    request.withBearerToken(this.api.apiKey)
    return new HttpClient(request).send() as Promise<Balance>
  }
}

export default BalanceClient
