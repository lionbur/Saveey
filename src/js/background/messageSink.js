import { detected } from './store'
import { detectedProduct } from "../actions"
import './store/debug'

chrome.runtime.onMessage.addListener(({ type, payload }, sender) => {
  switch (type) {
    case detectedProduct.TYPE:
      detected.set(sender.tab.id, payload)
      break
  }
})
