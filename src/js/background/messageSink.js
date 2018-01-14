import { results } from './store'
import { detectedProduct, createWindow, createdWindow } from "../actions"
import { sendMessage } from "./helpers"
import './store/debug'

chrome.runtime.onMessage.addListener(async ({ type, payload }, sender) => {
  console.log('extension got message', type, payload)

  switch (type) {
    case detectedProduct.TYPE: {
      const gotFirstResult = await results.initialItemSearch(payload)
      if (gotFirstResult) {
        sendMessage(sender.tab.id, createWindow())
      }

      break
    }

    case createdWindow.TYPE: {
      await results.itemSearch(payload, sender.tab.id)
      break
    }
  }
})
