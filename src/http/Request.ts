import { HTTP_METHOD } from '../constants'

class Request {
  /**
   * Base URL for the request
   * @type {string}
   * @public
   */
  public baseUrl: string

  /**
   * The HTTP Method used for this request
   * @type {string} GET|DELETE|POST|PUT
   * @public
   */
  public httpMethod: HTTP_METHOD

  /**
   * The API method to call
   * @type {string}
   * @public
   */
  public method: string

  /**
   * The headers to use on this request
   * @type {object}
   * @public
   */
  public headers = {}

  /**
   * Query string parameters for the request
   * @type {object}
   * @public
   */
  public queryParams = {}

  /**
   * The request body (application/json)
   * @type {object}
   * @public
   */
  public params = {}

  constructor(
    baseUrl: string,
    httpMethod: keyof typeof HTTP_METHOD,
    method: string,
  ) {
    this.baseUrl = baseUrl
    this.httpMethod = HTTP_METHOD[httpMethod]
    this.method = method
  }

  /**
   * Add the bearer token to the headers
   * @param token {string}
   */
  public withBearerToken(token: string) {
    this.addHeader('Authorization', `Bearer ${token}`)
  }

  /**
   * Add a generic header to the request
   * @param {string} the header key
   * @param {any} the header value
   */
  public addHeader(key: string, value: string) {
    Object.assign(this.headers, { [key]: value })
  }

  /**
   * add a query string parameter to the request
   * @param {string} querystring key
   * @param {any} querystring value
   */
  public addQueryStringParameter(key: string, value: any) {
    Object.assign(this.queryParams, { [key]: value })
  }

  /**
   * add a body parameter to the request
   * @param {string} parameter key
   * @param {any} parameter value
   */
  public addParameter(key: string, value: any) {
    Object.assign(this.params, { [key]: value })
  }

  /**
   * get the HTTP method in all lower case
   * @return {string}
   */
  public getHttpMethod() {
    return this.httpMethod.toString().toLowerCase()
  }
}

export default Request
