import Axios, { AxiosInstance } from 'axios'
import Request from './Request'
import Response from './Response'
import { HTTP_METHOD } from '../constants'

class HttpClient {
  protected request: Request

  protected instance: AxiosInstance

  constructor(request: Request) {
    this.request = request
    this.instance = Axios.create({
      baseURL: request.baseUrl,
      headers: request.headers,
    })
  }

  /**
   * Execute the HTTP request
   * @return {Promise<void|Message|MessageCollection|Balance>} response depends on request type
   */
  public async send() {
    if (this.request.httpMethod === HTTP_METHOD.DELETE) {
      await this.instance.delete(this.request.method)
      return null
    }
    if (this.request.httpMethod === HTTP_METHOD.PUT) {
      const rawResponse = await this.instance.put(
        this.request.method,
        this.request.params,
      )
      return new Response(rawResponse).toObject()
    }
    if (this.request.httpMethod === HTTP_METHOD.POST) {
      const rawResponse = await this.instance.post(
        this.request.method,
        this.request.params,
      )
      return rawResponse.data ? new Response(rawResponse).toObject() : null
    }
    const rawResponse = await this.instance.get(this.request.method, {
      params: this.request.queryParams,
    })
    return new Response(rawResponse).toObject()
  }
}

export default HttpClient
