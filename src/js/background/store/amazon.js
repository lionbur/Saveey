import { observable } from 'mobx'

import { amazonItemSearch } from "../../lib/saveeyProductSearch/index"
import tabs from './tabs'
import ebay from './ebay'
import log from './log'
import sendMessage from '../helpers/sendMessage'
import { detectedCommonKeywords } from "../../actions"

class AmazonStore {
  @observable items = new Map()
  @observable commonWords = {}

  async itemSearch(productName, tabId) {
    const { items, commonWords } = await amazonItemSearch(productName)
    const keywords = Object.keys(commonWords).join(' ')

    if (!tabs.has(keywords)) {
      tabs.set(keywords, [tabId])
    } else {
      tabs.get(keywords).push(tabId)
    }

    sendMessage(tabId, detectedCommonKeywords(commonWords))

    require('./results')

    this.commonWords[keywords] = commonWords
    this.items.set(keywords, items)

    ebay.itemSearch(keywords)

    log({ amazon: this })
  }
}

export default new AmazonStore()