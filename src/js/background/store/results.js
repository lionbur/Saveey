import { toJS } from 'mobx'

import { findCommonWords } from '../../lib/saveeyProductSearch'
import amazon from './amazon'
import ebay from './ebay'
import tabs from './tabs'
import sendMessage from '../helpers/sendMessage'
import { detectedCommonKeywords, updateResults } from "../../actions"

class ResultsStore {
  cache = {}
  keywordsForProductName = {}
  commonWordsForKeywords = {}

  async itemSearch(productName, tabId) {
    const { keywordsForProductName, commonWordsForKeywords, cache } = this

    if (!keywordsForProductName[productName]) {
      const ebayItems = await ebay.itemSearch(productName)

      const commonWords = findCommonWords(
        productName,
        ebayItems
          .map(({ name }) => name)
      )

      const keywords = Object.keys(commonWords).join(' ')

      tabs.setKeywordsForTab(keywords, tabId)
      sendMessage(tabId, detectedCommonKeywords(commonWords))
      this.updateTab(tabId, ebayItems)

      const amazonItems = []
      await amazon.itemSearch(keywords, amazonItemPage => {
        amazonItems.push(...amazonItemPage)
        this.updateTab(tabId, [...ebayItems, ...amazonItems])
      })

      commonWordsForKeywords[keywords] = commonWords
      cache[keywords] = [
        ...ebayItems,
        ...amazonItems,
      ]
      keywordsForProductName[productName] = keywords

      this.updateTab(tabId, cache[keywords])
    } else {
      const keywords = keywordsForProductName[productName]
      const commonWords = commonWordsForKeywords[keywords]

      tabs.setKeywordsForTab(keywords, tabId)
      sendMessage(tabId, detectedCommonKeywords(commonWords))

      this.updateTab(tabId, cache[keywords])
    }
  }

  updateTab(tabId, results) {
    sendMessage(tabId, updateResults(results))
  }
}

export default new ResultsStore()
