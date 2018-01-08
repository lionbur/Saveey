import { observable, action } from 'mobx'

import { ebayItemSearch } from "../../lib/saveeyProductSearch/index"
import amazon from './amazon'
import log from './log'

class eBayStore {
  cache = {}
  @observable items = new Map()

  @action async itemSearch(keywords) {
    const { cache } = this

    if (!cache[keywords]) {
      cache[keywords] = await ebayItemSearch(keywords)
      this.items.set(keywords, cache[keywords].items)
    }
    log({ ebay: this })
  }
}
export default new eBayStore()