class Balance {
  public amount: number

  /**
   * check if a URL belongs to a balance instance
   * @param {string} request url
   * @return {boolean}
   */
  public static isOfType(url: string) {
    return /^\/balance(.*)/.test(url)
  }

  /**
   * convert a raw response body to a Balance instance
   * @param {object} raw axios respone body
   * @return {Balance}
   */
  public static deserialize(rawBody: any): Balance {
    return new Balance(rawBody.amount)
  }

  constructor(amount: number) {
    this.amount = amount
  }
}

export default Balance
