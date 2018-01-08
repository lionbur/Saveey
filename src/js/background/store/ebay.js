import { observable, action } from 'mobx'

import { ebayItemSearch } from "../../lib/saveeyProductSearch/index"
import { getCountryCode } from "./countryCode"
import log from './log'

class eBayStore {
  @observable items = new Map()

  @action async itemSearch(keywords) {
    if (!this.items.has(keywords)) {
      this.items.set(keywords, await ebayItemSearch({
        keywords,
        availableToCountryCode: await getCountryCode(),
      }))
    }
    log({ ebay: this })

    return this.items.get(keywords)
  }
}
export default new eBayStore()