import { action } from 'mobx'

import { createdWindow, detectedKeywords, detectedCommonKeywords, updateResults } from "../actions"
import { detected, results } from './store'

chrome.runtime.onMessage.addListener(action(({ type, payload }) => {
  console.log('floating window got message', type, payload)
  switch (type) {
    case detectedKeywords.TYPE:
      detected.keywords = payload
      break

    case detectedCommonKeywords.TYPE:
      detected.commonWords = payload
      break

    case updateResults.TYPE:
      results.items = payload
      break
  }
}))

const { searchParams } = new URL(location)
const productName = searchParams.get('productName')
const url = searchParams.get('url')

chrome.runtime.sendMessage(createdWindow({
  productName,
  url,
}))

detected.productName = productName
detected.url = url