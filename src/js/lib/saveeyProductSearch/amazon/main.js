import AmazonApi from './api'
import { translate } from '../common'
import { get, castArray } from 'lodash'

import { productNameToKeywords, findCommonWords } from '../common'

const awsId = 'AKIAJUI45MRHWJVMOZKA'
const awsTag = 'saveey2018-20'

const secretKey1 = 'UgWpEOjWiD+kmVSB6t1ur'
const secretKey2 = '4vnXFdpAe7VmGhOAFq'
const awsSecret = `${secretKey1}/${secretKey2}`
const responseGroup = 'ItemAttributes,Offers,Images'

const extractFloat = s => s && parseFloat(
  s.replace(/(?![\d.]+)./g, '')
)

export const amazonItemSearch = async productName => {
  const api = new AmazonApi({ awsId, awsTag, awsSecret })
  const keywords = (await translate(
    productNameToKeywords(productName),
    { to: 'en' }
  ))
    .toLowerCase()

  const results = await api.itemSearch({ keywords })
  const items = castArray(get(results, 'itemSearchResponse.items.item'))
    .map(({ detailPageURL, itemAttributes, smallImage }) => ({
      name: itemAttributes.title,
      price: {
        amount: extractFloat(get(itemAttributes, 'listPrice.formattedPrice')),
        currencyCode: get(itemAttributes, 'listPrice.currencyCode')
      },
      url: detailPageURL,
      thumbnailUrl: get(smallImage, 'url')
    }))

  console.log('Amazon Results', items)
  console.log('Common Words', findCommonWords(
    keywords,
    items
      .map(({ name }) => name)
  ))

  return items
}