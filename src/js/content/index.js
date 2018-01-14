import { detect } from "../lib/saveeyAnalyzer"

import { detectedProduct } from "../actions"
import { detected } from './store'
import './messageSink'

(async function () {
  try {
    const detectResult = await detect(document.body)

    Object.assign(detected, detectResult)
    console.log('detection', detected)

    if (detected.productName) {
      chrome.runtime.sendMessage(detectedProduct({
        productName: detected.productName,
        url: location.href,
      }))
    }
  } catch (error) {
//    chrome.runtime.sendMessage(detectedProduct.failure(error))
  }
})()