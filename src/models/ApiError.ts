import { IHttpClientError } from '../http/HttpClientInterface'

class ApiError extends Error {
  public code: number

  public message: string

  /**
   * deserialize an axios error and throw it
   * @param {AxiosError} the axios error
   */
  static deserialize(error: IHttpClientError) {
    throw new ApiError(error.code ? Number(error.code) : 500, error.message)
  }

  constructor(code: number, reason: string) {
    super()
    this.code = code
    this.name = this.getName()
    this.message = reason
  }

  /**
   * convert a HTTP Code into a readable error
   * @return {string}
   */
  public getName() {
    switch (this.code) {
      case 401:
        return 'UNAUTHORIZED'
      case 404:
        return 'NOT FOUND'
      case 405:
        return 'METHOD NOT ALLOWED'
      case 422:
        return 'UNPROCESSABLE ENTITY'
      case 429:
        return 'TOO MANY REQUESTS'
      case 500:
      default:
        return 'INTERNAL SERVER ERROR'
      case 503:
        return 'SERVICE UNAVAILABLE'
    }
  }
}

export default ApiError
