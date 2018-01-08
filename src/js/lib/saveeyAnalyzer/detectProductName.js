import { getOffset, isElementVisible, toPixels } from './common'

const breakIntoWords = text => text
  .split(/\s+/)

const getScore = (a, b) => {
  let score = 0

  for (let i = 0; i < a.length; i++) {
    const start = b.indexOf(a[i])

    if (start >= 0) {
      let j
      for (j = start; (i < a.length) && (j < b.length) && (b[j] === a[i]); i++, j++) {}

      let subScore = j - start

      if (i === 0) {
        subScore *= 2
      }
      if (start === 0) {
        subScore *= 2
      }

      score += subScore
    }
  }

  return score
}

const cleanText = text => text
  .trim()
  .toLowerCase()
  .replace(/[()®]/g, '')
  .replace(/\s+-+\s+|,\s/g, ' ')

export function detectProductName(parent, maxTop) {
  const cleanTitle = cleanText(document.title)
  const titleWords = breakIntoWords(cleanTitle)
  const escapeRegExp = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")

  console.log({ titleWords })

  const titleRegExp = new RegExp(
    titleWords
      .map(escapeRegExp)
      .join('|'),
    'i'
  )

  const searchCache = new Map()
  let bestScore = -1
  let foundNode = null

  do {
    const iterator = document.createNodeIterator(
      parent,
      NodeFilter.SHOW_TEXT,
      el => !searchCache.has(el)
        && el.textContent
        && (el.textContent.trim().length < document.title.length * 2)
        && titleRegExp.test(el.textContent.trim())
        && el.parentElement.offsetParent
        && (getOffset(el.parentElement).top <= maxTop)
        && isElementVisible(el.parentElement)
    )
    let node

    while (node = iterator.nextNode()) {
      const nodeText = cleanText(node.textContent)
      const nodeWords = breakIntoWords(nodeText)
      const { fontSize } = getComputedStyle(node.parentElement)

      const score = getScore(titleWords, nodeWords) * toPixels(fontSize)

      console.log({ bestScore, node })

      searchCache.set(node, score)
      if (score > bestScore) {
        foundNode = node
        bestScore = score
      } else if (foundNode
        && (score === bestScore)
        && (toPixels(getComputedStyle(foundNode.parentElement).fontSize)
          < toPixels(getComputedStyle(node.parentElement).fontSize))) {
        foundNode = node
      }
    }
  } while ((parent = parent.parentElement) && (bestScore < titleWords.length))

  if (foundNode) {
    foundNode.parentElement.style.backgroundColor = 'yellow'
    return foundNode.textContent.trim()
  }

  return null
}