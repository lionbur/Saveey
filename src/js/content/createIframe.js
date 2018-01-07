export default function(payload) {
  const iframe = document.createElement('iframe')
  iframe.src = `${chrome.extension.getURL('inject.html')}?payload=${encodeURIComponent(JSON.stringify(payload))}&protocol=${location.protocol}`

  return iframe
}