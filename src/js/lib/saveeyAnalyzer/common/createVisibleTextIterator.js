import { isElementVisible } from '.'

export default (regExp, root, maxLength) => document.createNodeIterator(
  root,
  NodeFilter.SHOW_TEXT,
  el =>
    el.parentElement.offsetParent
    && (getComputedStyle(el.parentElement).display !== 'none')
    && el.textContent
    && (el.textContent.trim().length <= maxLength)
    && regExp.test(el.textContent.trim())
    && isElementVisible(el.parentElement)
)
