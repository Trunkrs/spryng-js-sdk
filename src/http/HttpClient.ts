import Request from './Request'
import Response from './Response'
import { HTTP_METHOD } from '../constants'
import IHttpClientInterface from './HttpClientInterface'

class HttpClient {
  protected request: Request

  protected clientInstance?: IHttpClientInterface

  constructor(request: Request, httpClient?: IHttpClientInterface) {
    this.request = request
    this.clientInstance = httpClient
  }

  /**
   * Execute the HTTP request
   * @return {Promise<void|Message|MessageCollection|Balance>} response depends on request type
   */
  public async send() {
    const client = await this.getClient()
    if (this.request.httpMethod === HTTP_METHOD.DELETE) {
      await client.delete(this.request.method)
      return null
    }
    if (this.request.httpMethod === HTTP_METHOD.PUT) {
      const rawResponse = await client.put(
        this.request.method,
        this.request.params,
      )
      return new Response(rawResponse).toObject()
    }
    if (this.request.httpMethod === HTTP_METHOD.POST) {
      const rawResponse = await client.post(
        this.request.method,
        this.request.params,
      )
      return rawResponse.data ? new Response(rawResponse).toObject() : null
    }
    const rawResponse = await client.get(this.request.method, {
      params: this.request.queryParams,
    })
    return new Response(rawResponse).toObject()
  }

  public async getClient() {
    if (!this.clientInstance) {
      const Axios: any = await import('axios')
      return Axios.create({
        baseURL: this.request.baseUrl,
        headers: this.request.headers,
      })
    }
    return this.clientInstance
  }
}

export default HttpClient
