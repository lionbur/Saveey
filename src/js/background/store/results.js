import { toJS } from 'mobx'

import { findCommonWords } from '../../lib/saveeyProductSearch'
import amazon from './amazon'
import ebay from './ebay'
import tabs from './tabs'
import sendMessage from '../helpers/sendMessage'
import { detectedCommonKeywords, updateResults } from "../../actions"

class ResultsStore {
  keywordsForProductName = {}
  commonWordsForKeywords = {}

  async itemSearch(productName, tabId) {
    const { keywordsForProductName, commonWordsForKeywords } = this

    if (!keywordsForProductName[productName]) {
      const items = await ebay.itemSearch(productName)

      const commonWords = findCommonWords(
        productName,
        items
          .map(({ name }) => name)
      )

      const keywords = Object.keys(commonWords).join(' ')

      keywordsForProductName[productName] = keywords
      commonWordsForKeywords[keywords] = commonWords
    }

    const keywords = keywordsForProductName[productName]
    const commonWords = commonWordsForKeywords[keywords]

    tabs.setKeywordsForTab(keywords, tabId)
    sendMessage(tabId, detectedCommonKeywords(commonWords))
    this.updateTab(tabId, keywords)

    await amazon.itemSearch(keywords)
    this.updateTab(tabId, keywords)
  }

  updateTab(tabId, keywords) {
    sendMessage(tabId, updateResults(combineResults(keywords)))
  }
}

export const combineResults = keywords => [
  ...toJS(amazon.items.get(keywords) || []),
  ...toJS(ebay.items.get(keywords) || []),
]

export default new ResultsStore()
