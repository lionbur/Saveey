import { observable } from 'mobx'

import { tryFixPrices } from "./fixer"
import { amazonItemSearch } from "../../lib/saveeyProductSearch"

const hasLocalShipping = async url => {
  const response = await fetch(url)
  const text = await response.text()

  if (/this\s+item\s+does\s+not\s+ship\s+to\s+/i.test(text)) {
    return false
  } else if (/this\s+item\s+ships\s+to\s+/i.test(text)) {
    if (/Shipping & Import Fees Deposit to/i.test(text)) {
      console.log('found shipping', url)
    }
    return true
  }

  return null
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))

class AmazonStore {
  async itemSearch(keywords, callback) {
    let itemPage = 1
    let numResults = 0
    let totalResults = null
    let totalPages = null
    let timeLastFetch = null

    do {
      if (itemPage > 1) {
        await delay(Math.max(0, 2000 - (Date.now() - timeLastFetch)))
      }

      const results = await amazonItemSearch({
        keywords,
        itemPage,
      })
      timeLastFetch = Date.now()
      itemPage++
      numResults += results.items.length
      totalResults = Math.min(100, totalResults || results.totalResults)
      totalPages = Math.min(10, totalPages || results.totalPages)
console.log({ itemPage, numResults, totalResults, totalPages })
      const items = await tryFixPrices(results.items)

      const localShippingForItems = await Promise.all(items
        .map(({url}) => hasLocalShipping(url))
      )

      callback(localShippingForItems
        .map((hasLocalShipping, index) => ({hasLocalShipping, item: items[index]}))
        .filter(({hasLocalShipping}) => hasLocalShipping)
        .map(({item}) => item))
    } while (numResults < totalResults && itemPage < totalPages)
  }
}

export default new AmazonStore()