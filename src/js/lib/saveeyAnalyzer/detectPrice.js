import { createVisibleElementInnerTextIterator, getOffset, toPixels, hasLineThrough } from './common'

const priceAndCurrencyRegExp = /[\s\S]{0,50}((USD|EUR|€|\$|£|GBP|₪|ILS)\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)|(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)\s?(USD|EUR|€|\$|£|GBP|₪|ILS))[\s\S]{0,50}/i
const priceAndCurrencyOnlyRegExp = /^([\s\S]{0,50}((USD|EUR|€|\$|£|GBP|₪|ILS)\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)|(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)\s?(USD|EUR|€|\$|£|GBP|₪|ILS))[\s\S]{0,50})$/i

export function detectPrice(buyButton) {
  let parent = buyButton

  while (parent) {
    if (priceAndCurrencyRegExp.test(parent.innerText.trim())) {
      break
    }
    parent = parent.parentElement
  }

  let priceElement
  if (parent) {
    function getDepth(node) {
      let result

      for (result = 0; (node !== parent) && node; result++) {
        node = node.parentElement
      }

      return result
    }

    const results = []
    const iterator = createVisibleElementInnerTextIterator(priceAndCurrencyOnlyRegExp, parent, false)
    let element

    while (element = iterator.nextNode()) {
      let maxFontSize = toPixels(getComputedStyle(element).fontSize)
      for (const child of element.children) {
        maxFontSize = Math.max(maxFontSize, toPixels(getComputedStyle(child).fontSize))
        if (hasLineThrough(child)) {
          maxFontSize = 0
          break
        }
      }

      results.push({
        element,
        depth: getDepth(element),
        offset: getOffset(element),
        fontSize: maxFontSize,
      })
    }

    results
      .sort((a, b) =>
        (b.depth - a.depth)
        + 0.1 * (a.offset.top - b.offset.top)
        + (b.fontSize - a.fontSize)
      )

    if (results.length) {
      priceElement = results[0].element
      priceElement.style.backgroundColor = 'lime'
    }
  }

  return {
    priceElement,
    parent,
  }
}
