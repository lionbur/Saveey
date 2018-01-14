import { detected } from './store'
import { createWindow, updateResults } from "../actions"
import {createFloatingWindow} from "./floatingWindow";

let firstTime = true

chrome.runtime.onMessage.addListener(({ type, payload }, sender) => {
  console.log('e-commerce site got message', type, payload)
  switch (type) {
    case createWindow.TYPE:
      createFloatingWindow(detected.productName)
      break

    case updateResults.TYPE: {
      if (firstTime) {
        firstTime = false
        const iframe = document.querySelector('.sav-window iframe')
        iframe.style.display = 'none'
        setTimeout(() => iframe.style.display = 'block', 100)
      }
      break
    }
  }
})
