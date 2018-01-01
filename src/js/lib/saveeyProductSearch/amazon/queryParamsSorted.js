export default params => Object
  .entries(params)
  .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  .sort()
  .join('&')