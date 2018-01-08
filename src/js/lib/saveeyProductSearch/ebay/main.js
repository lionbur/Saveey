import EbayApi from './api'
import { get, castArray } from 'lodash'

const convertPrice = price => price && ({
  amount: parseFloat(price.__value__),
  currencyCode: price['@currencyId'],
})

const ebayAppName = 'Saveey-saveey-PRD-d5d8a3c47-a4f4fc2e'
export const ebayItemSearch = async (
  {
    keywords: rawKeywords,
    availableToCountryCode,
  }) => {
//  const keywordArray = rawKeywords.split(' ')
  const keywords = rawKeywords // `@${Math.round(keywordArray.length / 2)} ${rawKeywords}`
  const api = new EbayApi({ ebayAppName })

  const results = await api.findItemsByKeywords({
    keywords,
    'ItemFilter.AvailableTo': availableToCountryCode,
  })
  const items = castArray(
    get(results, 'findItemsByKeywordsResponse[0].searchResult[0].item') || []
  )
    .map(({ title, sellingStatus, viewItemURL, galleryURL, shippingInfo }) => ({
      name: title[0],
      price: convertPrice(get(sellingStatus[0], 'currentPrice[0]')),
      shippingCost: convertPrice(get(shippingInfo[0], 'shippingServiceCost[0]')),
      url: viewItemURL[0],
      thumbnailUrl: galleryURL[0],
    }))

  return items
}