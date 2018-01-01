import { isLeafNode, hasLineThrough, isElementVisible, getOffset } from '.'

export default (regExp, root = document.body, onlyLeaves = true) => document.createNodeIterator(
  root,
  NodeFilter.SHOW_ELEMENT,
  el =>
    (!onlyLeaves || isLeafNode(el))
    && el.offsetParent
    && el.innerText
    && regExp.test(el.innerText.trim())
    && !hasLineThrough(el)
    && isElementVisible(el)
    && isFinite(getOffset(el).top)
)
