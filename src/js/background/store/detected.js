import { observable } from 'mobx'
import { without } from 'lodash'

import { translate, productNameToKeywords } from "../../lib/saveeyProductSearch"
import results from './results'
import translations from './translations'

const detected = observable.shallowMap()

const badWords = [ 'a' ]

const cleanProductName = name => without(name.split(' '), ...badWords).join(' ')

detected.observe(async ({ type, name, newValue }) => {
  switch (type) {
    case 'add':
    case 'update': {
      const keywords = productNameToKeywords(newValue.productName)

      const translatedProductName = translations[keywords]
        || (translations[keywords] = (await translate(keywords, { to: 'en' }))
            .toLowerCase())

      results.itemSearch(cleanProductName(translatedProductName), parseInt(name))
      break
    }
  }
})

export default detected
