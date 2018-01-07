import EbayApi from './api'
import { get, castArray } from 'lodash'

const convertPrice = price => price && ({
  amount: parseFloat(price.__value__),
  currencyCode: price['@currencyId'],
})

const ebayAppName = 'Saveey-saveey-PRD-d5d8a3c47-a4f4fc2e'
export const ebayItemSearch = async keywords => {
  const api = new EbayApi({ ebayAppName })

  const results = await api.findItemsIneBayStores({ keywords })
  const items = castArray(
    get(results, 'findItemsIneBayStoresResponse[0].searchResult[0].item')
  )
    .map(({ title, sellingStatus, viewItemURL, galleryURL }) => ({
      name: title[0],
      price: convertPrice(get(sellingStatus[0], 'currentPrice[0]')),
      url: viewItemURL[0],
      thumbnailUrl: galleryURL[0],
    }))

  return {
    items
  }
}