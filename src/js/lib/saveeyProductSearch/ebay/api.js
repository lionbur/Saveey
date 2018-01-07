import { queryParams } from '../common'

export default class {
  endpoint = 'svcs.ebay.com'
  uri = 'services/search/FindingService/v1'
  ebayAppName = null

  constructor({ ebayAppName }) {
    Object.assign(this, { ebayAppName })
  }

  makeOperation = operation => async (
    {
      globalId = 'EBAY-US',
      ...rest,
    }
  ) => await (
    await fetch(`https://${this.endpoint}/${this.uri}?${queryParams({
      'OPERATION-NAME': operation,
      'SERVICE-VERSION': '1.0.0',
      'SECURITY-APPNAME': this.ebayAppName,
      'GLOBAL-ID': globalId,
      'RESPONSE-DATA-FORMAT': 'JSON',
      'REST-PAYLOAD': 1,
      ...rest,
//        'paginationInput.entriesPerPage': 3,
    })}`, {
      mode: 'cors',
    }))
      .json()

  findItemsIneBayStores = this.makeOperation('findItemsIneBayStores')
}