import { createVisibleTextIterator, getOffset } from './common'

function findClickable (node) {
  if (!node) {
    return null
  }

  if ((/^a$|^button$/i.test(node.tagName))
    || node.onclick
    || /^submit$/i.test(node.type)) {
    return node
  }

  return findClickable(node.parentElement)
}

const offscreenFilter = value => value < 0 ? 10000 : value
const avoidOffscreen = ({ left, top }) => ({ left: offscreenFilter(left), top: offscreenFilter(top) })
const buyOrCartRegExp = /to\sbasket|to\scart|^buy$|^buy\s|^purchase|קנה|קניה|רכוש|\s+לסל$/i
const buyRegExp = /buy$|^buy\s|^purchase|קנה|קניה|רכוש/i

export function detectBuyButton(root) {
  const iterator = createVisibleTextIterator(buyOrCartRegExp, root, 20)
  const results = []
  let node

  while (node = iterator.nextNode()) {
    const button = findClickable(node.parentElement)
    if (button) {
      results.push({
        node,
        button,
        offset: avoidOffscreen(getOffset(button)),
      })
    }
  }

  results
    .sort((a, b) =>
      ((buyRegExp.test(b.button.innerText.trim()) ? 1 : 0)
        - (buyRegExp.test(a.button.innerText.trim()) ? 1 : 0))
      + (a.offset.top - b.offset.top))

  if (results.length) {
    results[0].button.style.border = '2px solid red'
  }

  return results[0]
}
