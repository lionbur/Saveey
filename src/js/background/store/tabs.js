import { observable } from 'mobx'

import { detectedKeywords } from "../../actions"
import { sendMessage } from "../helpers"

const tabs = observable.shallowMap()

tabs.observe(({ type, name, oldValue, newValue }) => {
  switch (type) {
    case 'add':
    case 'update':
      newValue
        .filter(tabId => !oldValue || !oldValue.includes(tabId))
        .forEach(tabId => sendMessage(tabId, detectedKeywords(name)))
      break
  }
})

export default tabs