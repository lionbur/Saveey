import { observable } from 'mobx'

import { amazonItemSearch } from "../../lib/saveeyProductSearch"
import tabs from './tabs'
import ebay from './ebay'
import log from './log'
import { combineResults } from "./results"
import sendMessage from '../helpers/sendMessage'
import { detectedCommonKeywords, updateResults } from "../../actions"

class AmazonStore {
  cache = {}
  @observable items = new Map()
  @observable commonWords = {}

  async itemSearch(productName, tabId) {
    const { cache } = this

    if (!cache[productName]) {
      const results = await amazonItemSearch(productName)
      const { items, commonWords } = results
      const keywords = Object.keys(commonWords).join(' ')

      cache[productName] = {
        items,
        commonWords,
        keywords
      }
      this.commonWords[keywords] = commonWords
      this.items.set(keywords, items)
    }

    const { commonWords, keywords } = cache[productName]

    tabs.setKeywordsForTab(keywords, tabId)
    sendMessage(tabId, detectedCommonKeywords(commonWords))
    sendMessage(tabId, updateResults(combineResults(keywords)))
    console.log('results', keywords, combineResults(keywords))

    await ebay.itemSearch(keywords)
    sendMessage(tabId, updateResults(combineResults(keywords)))
    console.log('results', keywords, combineResults(keywords))

    log({ amazon: this })
  }
}

export default new AmazonStore()