import { findCommonWords } from '../../lib/saveeyProductSearch'
import amazon from './amazon'
import ebay, { hasLocalShipping } from './ebay'
import tabs from './tabs'
import sendMessage from '../helpers/sendMessage'
import { detectedCommonKeywords, updateResults } from "../../actions"
import { cleanProductName } from "../helpers"
import { translate, productNameToKeywords } from "../../lib/saveeyProductSearch"
import translations from './translations'

const translateKeywords = async keywords => translations[keywords]
  || (translations[keywords] = cleanProductName(
    (await translate(keywords, { to: 'en' }))
      .toLowerCase()))
const productNameToTranslatedKeywords = async productName =>  translateKeywords(
  productNameToKeywords(productName)
)

class ResultsStore {
  ebayItems = {}
  cache = {}

  initialItemSearch = ({ productName, url }) => new Promise(async resolve => {
    const translatedKeywords = await productNameToTranslatedKeywords(productName)
    const { ebayItems } = this

    if (ebayItems[translatedKeywords]) {
      const result = ebayItems[translatedKeywords]
        .filter(item => item.url !== url)

      resolve(result.length > 0)
    }

    const items = (await ebay.itemSearch(translatedKeywords))
      .filter(item => item.url !== url)
    let itemsLeft = items.length

    for (const item of items) {
      hasLocalShipping(item.url)
        .then(result => {
          if (result || (--itemsLeft === 0)) {
            resolve(result)
          }
        })
    }
  })

  get_eBayItems = (translatedKeywords, tabId, url) => new Promise(async resolve => {
    const items = (await ebay.itemSearch(translatedKeywords))
      .filter(item => item.url !== url)
    let itemsLeft = items.length
    const shippingItems = []
    items
      .forEach(async item => {
        if (await hasLocalShipping(item.url)) {
          shippingItems.push(item)
          this.updateTab(tabId, shippingItems)
        }
        if (--itemsLeft === 0) {
          resolve(shippingItems)
        }
      })
  })

  async itemSearch({ productName, url }, tabId) {
    const {
      ebayItems,
      cache
    } = this
    const translatedKeywords = await productNameToTranslatedKeywords(productName)

    if (!ebayItems[translatedKeywords]) {
      ebayItems[translatedKeywords] = await this.get_eBayItems(translatedKeywords, tabId, url)
    }

    const commonWords = findCommonWords(
      translatedKeywords,
      ebayItems[translatedKeywords]
        .map(({name}) => name)
    )
    const keywords = Object.keys(commonWords).join(' ')

    if (!cache[keywords]) {
      tabs.setKeywordsForTab(keywords, tabId)
      sendMessage(tabId, detectedCommonKeywords(commonWords))
      this.updateTab(tabId, ebayItems[translatedKeywords])

      const amazonItems = []
      await amazon.itemSearch(keywords, amazonItemPage => {
        amazonItems.push(...amazonItemPage)
        this.updateTab(tabId, [...ebayItems[translatedKeywords], ...amazonItems])
      })

      cache[keywords] = [
        ...ebayItems[translatedKeywords],
        ...amazonItems,
      ]

      this.updateTab(tabId, cache[keywords])
    } else {
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
