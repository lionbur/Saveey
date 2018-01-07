import { observable, action } from 'mobx'

import { ebayItemSearch } from "../../lib/saveeyProductSearch/index"
import amazon from './amazon'
import log from './log'

class eBayStore {
  @observable items = new Map()

  @action async itemSearch(keywords) {
    this.items.set(keywords, (await ebayItemSearch(keywords)).items)
    log({ ebay: this })
  }
}
export default new eBayStore()