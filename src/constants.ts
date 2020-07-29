export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum MESSAGE_STATUS {
  pending = 'pending',
  sent = 'sent',
  delivered = 'delivered',
  failed = 'failed',
}

export enum MESSAGE_ENCODING {
  plain = 'plain',
  unicode = 'unicode',
  auto = 'auto',
}

export const BASE_URL = 'https://rest.spryngsms.com/v1'

export default { HTTP_METHOD, MESSAGE_STATUS, MESSAGE_ENCODING }
