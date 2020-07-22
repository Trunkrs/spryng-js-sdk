interface IHttpClientConfig {
  headers?: {
    [key: string]: string
  }
  params?: {
    [key: string]: string
  }
}

interface IHttpClientRequestConfig {
  url?: string
  method?: string
  headers?: { [key: string]: string }
  params?: { [key: string]: string }
  data?: { [key: string]: unknown }
}

export interface IHttpClientResponse<T = any> {
  config: IHttpClientRequestConfig
  data: T
  status: number
  statusText: string
  headers: any
  request?: any
}

export interface IHttpClientError<T = any> extends Error {
  config: IHttpClientRequestConfig
  code?: string
  request?: any
  response?: IHttpClientResponse<T>
  isAxiosError: boolean
}

interface IHttpClientInterface {
  get: <T = any, R = IHttpClientResponse<T>>(
    url: string,
    config?: IHttpClientConfig,
  ) => Promise<R>
  post: <T = any, R = IHttpClientResponse<T>>(
    url: string,
    data?: unknown,
    config?: IHttpClientConfig,
  ) => Promise<R>
  put: <T = any, R = IHttpClientResponse<T>>(
    url: string,
    data?: unknown,
    config?: IHttpClientConfig,
  ) => Promise<R>
  delete: <T = any, R = IHttpClientResponse<T>>(
    url: string,
    config?: IHttpClientConfig,
  ) => Promise<R>
}

export default IHttpClientInterface
