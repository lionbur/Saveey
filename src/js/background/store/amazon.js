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

class AmazonStore {
  async itemSearch(keywords) {
    const items = await tryFixPrices(await amazonItemSearch(keywords))

    const localShippingForItems = await Promise.all(items
      .map(({ url }) => hasLocalShipping(url))
    )

    return localShippingForItems
      .map((hasLocalShipping, index) => ({ hasLocalShipping, item: items[index] }))
      .filter(({ hasLocalShipping }) => hasLocalShipping)
      .map(({ item }) => item)
  }
}

export default new AmazonStore()