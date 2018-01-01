const hasLineThrough = node => !node
  ? false
  : (getComputedStyle(node).textDecorationLine === 'line-through')
    || hasLineThrough(node.parentElement)

export default hasLineThrough

