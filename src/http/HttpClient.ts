import Request from './Request'
import Response from './Response'
import { HTTP_METHOD } from '../constants'
import IHttpClientInterface, {
  IHttpClientResponse,
} from './HttpClientInterface'

/**
 * HttpClient wrapper
 */
class HttpClient {
  /**
   * The request handled by the HttpClient
   * @type {Request}
   * @protected
   */
  protected request: Request

  /**
   * An instance of the actual HttpClient, must adhere to the interface of IHttpClientInterface
   * @type {IHttpClientInterface}
   * @protected
   */
  protected clientInstance?: IHttpClientInterface

  /**
   * Convert the raw response from the HttpClient to an instance of a response Model
   * @param {IHttpClientResponse} rawResponse
   * @param {string} hasProperty default is 'data'
   * @return <Message|MessageCollection|Balance|null>
   */
  private static toResponse<T = unknown>(
    rawResponse: IHttpClientResponse<T>,
    hasProperty: keyof IHttpClientResponse = 'data',
  ) {
    if (rawResponse[hasProperty]) {
      return new Response(rawResponse).toObject()
    }
    return null
  }

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
    switch (this.request.httpMethod) {
      case HTTP_METHOD.DELETE:
        return HttpClient.toResponse(await client.delete(this.request.method))
      case HTTP_METHOD.PUT:
        return HttpClient.toResponse(
          await client.put(this.request.method, this.request.params),
        )
      case HTTP_METHOD.POST:
        return HttpClient.toResponse(
          await client.post(this.request.method, this.request.params),
        )
      case HTTP_METHOD.GET:
      default:
        return HttpClient.toResponse(
          await client.get(this.request.method, {
            params: this.request.queryParams,
          }),
        )
    }
  }

  /**
   * Get the HttpClient instance or dynamically import axios
   * @return {IHttpClientInterface} http client
   */
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
