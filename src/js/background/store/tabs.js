import { observable } from 'mobx'
import { without } from 'lodash'

import { detectedKeywords } from "../../actions"
import { sendMessage } from "../helpers"

class TabsStore {
  keywordsToTabs = {}
  tabToKeywords = {}

  setKeywordsForTab(keywords, tabId) {
    const oldKeywords = this.tabToKeywords[tabId]
    if (oldKeywords !== keywords) {
      this.keywordsToTabs[oldKeywords] = without(this.keywordsToTabs[oldKeywords], tabId)
      this.keywordsToTabs[keywords] = this.keywordsToTabs[keywords] || []
      if (!this.keywordsToTabs[keywords].includes(tabId)) {
        this.keywordsToTabs[keywords].push(tabId)
      }
      this.tabToKeywords[tabId] = keywords
    }

    sendMessage(tabId, detectedKeywords(keywords))
  }
}

export default new TabsStore()