// eslint-disable-next-line import/no-cycle
import Spryng from '../Spryng'

class BaseClient {
  protected api: Spryng

  constructor(api: Spryng) {
    this.api = api
  }
}

export default BaseClient
