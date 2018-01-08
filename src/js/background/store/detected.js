import { observable } from 'mobx'

import { translate, productNameToKeywords } from "../../lib/saveeyProductSearch"
import amazon from './amazon'
import translations from './translations'

const detected = observable.shallowMap()

detected.observe(async ({ type, name, newValue }) => {
  switch (type) {
    case 'add':
    case 'update': {
      const keywords = productNameToKeywords(newValue.productName)

      const translatedProductName = translations[keywords]
        || (translations[keywords] = (await translate(keywords, { to: 'en' }))
            .toLowerCase())

      amazon.itemSearch(translatedProductName, parseInt(name))
      break
    }
  }
})

export default detected
