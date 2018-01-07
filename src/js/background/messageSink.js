import { observable } from 'mobx'

import { detected } from './store'
import { detectedProduct } from "../actions"

chrome.runtime.onMessage.addListener(({ type, payload }, sender) => {
  switch (type) {
    case detectedProduct.TYPE:
      detected.set(sender.tab.id, payload)
      break
  }
})
