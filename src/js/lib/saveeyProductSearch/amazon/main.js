import AmazonApi from './api'
import { get, castArray } from 'lodash'

import { productNameToKeywords, findCommonWords } from '../common'

const awsId = 'AKIAJUI45MRHWJVMOZKA'
const awsTag = 'saveey2018-20'
//const awsTag = 'saveey2018-21'

const secretKey1 = 'UgWpEOjWiD+kmVSB6t1ur'
const secretKey2 = '4vnXFdpAe7VmGhOAFq'
const awsSecret = `${secretKey1}/${secretKey2}`
const responseGroup = 'ItemAttributes,Offers,Images'

const extractFloat = s => s && parseFloat(
  s.replace(/(?![\d.]+)./g, '')
)

export const amazonItemSearch = async ({
  keywords,
  itemPage,
}) => {
  const api = new AmazonApi({ awsId, awsTag, awsSecret })

  const results = await api.itemSearch({ keywords, itemPage })
  const totalResults = parseInt(get(results, 'itemSearchResponse.items.totalResults'))
  const totalPages = parseInt(get(results, 'itemSearchResponse.items.totalPages'))
  let items = castArray(get(results, 'itemSearchResponse.items.item') || [])

  items = items
    .map(({ detailPageURL, itemAttributes, smallImage }) => ({
      name: itemAttributes.title,
      price: {
        amount: extractFloat(get(itemAttributes, 'listPrice.formattedPrice')),
        currencyCode: get(itemAttributes, 'listPrice.currencyCode')
      },
      url: detailPageURL,
      thumbnailUrl: get(smallImage, 'url')
    }))

  return {
    items,
    totalResults,
    totalPages,
  }
}