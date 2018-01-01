import AmazonApi from './api'

import { productNameToKeywords } from '../common'

const awsId = 'AKIAJUI45MRHWJVMOZKA'
const awsTag = 'saveey2018-20'

const secretKey1 = 'UgWpEOjWiD+kmVSB6t1ur'
const secretKey2 = '4vnXFdpAe7VmGhOAFq'
const awsSecret = `${secretKey1}/${secretKey2}`
const responseGroup = 'ItemAttributes,Offers,Images'

export const amazonItemSearch = async productName => {
  const api = new AmazonApi({ awsId, awsTag, awsSecret })
  const keywords = productNameToKeywords(productName)

  const results = await api.itemSearch({ keywords })

  console.log('Amazon Results', results)

  return results
}