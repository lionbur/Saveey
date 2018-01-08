import { toJS } from 'mobx'

import amazon from './amazon'
import ebay from './ebay'

export const combineResults = keywords => [
  ...toJS(amazon.items.get(keywords) || []),
  ...toJS(ebay.items.get(keywords) || []),
]
