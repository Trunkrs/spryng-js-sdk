// eslint-disable-next-line
export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// eslint-disable-next-line
export enum MESSAGE_STATUS {
  pending = 'pending',
  sent = 'sent',
  delivered = 'delivered',
  failed = 'failed',
}

// eslint-disable-next-line
export enum MESSAGE_ENCODING {
  plain = 'plain',
  unicode = 'unicode',
  auto = 'auto',
}
