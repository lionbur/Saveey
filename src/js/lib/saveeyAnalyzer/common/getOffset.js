export default function getOffset(node) {
  if (!node) {
    return { left: 0, top: 0 }
  }
  const parentOffset = getOffset(node.offsetParent)

  return {
    left: node.offsetLeft + parentOffset.left,
    top: node.offsetTop + parentOffset.top,
  }
}