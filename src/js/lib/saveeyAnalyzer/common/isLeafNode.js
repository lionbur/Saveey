export default node => Array.prototype
  .every.call(node.childNodes, ({ offsetParent }) => !offsetParent)