import { ebayItemSearch } from "../../lib/saveeyProductSearch/index"
import { getCountryCode } from "./countryCode"
import { tryFixPrices } from "./fixer"

const localShippingCache = {}

export const hasLocalShipping = async url => {
  if (url in localShippingCache) {
    return localShippingCache[url]
  }

  const response = await fetch(url)
  const text = await response.text()

  let result = false

  let match = text.match(/Shipping to: (.*?)<\/div>/)
  if (match)
  {
    const countries = match[1].toLowerCase().split(/,\s*/)
    result = countries.includes('worldwide') || countries.includes('israel')
  }

  if (result) {
    match = text.match(/Excludes: (.*?)<\/div>/)
    if (match) {
      const countries = match[1].toLowerCase().split(/,\s*/)
      result = !countries.includes('israel')
    }
  }

  localShippingCache[url] = result

  return localShippingCache[url]
}

class eBayStore {
  itemSearch = async keywords => tryFixPrices(
    (await ebayItemSearch({
      keywords,
      availableToCountryCode: await getCountryCode(),
    }))
  )
}

export default new eBayStore()