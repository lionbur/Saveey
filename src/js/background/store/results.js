import { computed, toJS } from 'mobx'

import { updateResults } from "../../actions"
import { sendMessage } from "../helpers"
import amazon from './amazon'
import ebay from './ebay'
import tabs from './tabs'

const results = computed(() => amazon.items
  .entries()
  .reduce((result, [keywords, keywordsItems]) => ({
    ...result,
    [keywords]: [
      ...keywordsItems,
      ...((ebay && ebay.items.get(keywords)) || []),
    ]
  }), {}))

results.observe(({ type, name, newValue }) => {
  console.log('results', type, name, newValue )
  if (type === 'update') {
    Object
      .entries(newValue)
      .forEach(([keywords, items]) => {
        const tabsForKeywords = tabs.get(keywords)

        tabsForKeywords.forEach(tabId => sendMessage(tabId, updateResults(toJS(items))))
      })
  }
})

export default results