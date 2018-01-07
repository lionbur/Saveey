import { observable } from 'mobx'

import amazon from './amazon'
import log from './log'

const detected = observable.shallowMap()

detected.observe(({ type, name, newValue }) => {
  if (type === 'add') {
    amazon.itemSearch(newValue.productName, parseInt(name))
    log({ 'A new product is detected': newValue })
  }
})

export default detected
