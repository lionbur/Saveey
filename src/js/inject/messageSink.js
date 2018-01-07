import { detectedProduct, detectedKeywords, detectedCommonKeywords, updateResults } from "../actions"
import { detected, results } from './store'

chrome.runtime.onMessage.addListener(({ type, payload }) => {
  console.log('message', type, payload)
  switch (type) {
    case detectedKeywords.TYPE:
      detected.keywords = payload
      break

    case detectedCommonKeywords.TYPE:
      detected.commonWords = payload
      break

    case updateResults.TYPE:
      payload.forEach(result => results.items.push(result))
      results.isEmpty = false
      break
  }
})

const { searchParams } = new URL(location)
const payload = JSON.parse(searchParams.get('payload'))

chrome.runtime.sendMessage(detectedProduct(payload))

Object.assign(detected, payload)