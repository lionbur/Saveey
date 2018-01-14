export default function(productName) {
  const iframe = document.createElement('iframe')
  const search = `productName=${encodeURIComponent(productName)}&url=${location.href}`
  iframe.src = chrome.extension.getURL(`inject.html?${search}`)

  return iframe
}