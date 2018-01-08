import { observable } from 'mobx'

import { tryFixPrices } from "./fixer"
import { amazonItemSearch } from "../../lib/saveeyProductSearch"

class AmazonStore {
  @observable items = new Map()

  async itemSearch(keywords) {
    if (!this.items.has(keywords)) {
      this.items.set(keywords, await tryFixPrices(await amazonItemSearch(keywords)))
    }

    return this.items.get(keywords)
  }
}

export default new AmazonStore()