export default size => /em$/.test(size)
  ? parseFloat(size.replace(/em$/, '')) * 16
  : parseFloat(size.replace(/px$/, ''))

