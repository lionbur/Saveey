export default productName => productName
  .trim()
  .toLowerCase()
  .replace(/[()®,]/g, '')
  .replace(/\s+-+\s+|,\s/g, ' ')