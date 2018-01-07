export default function () {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = chrome.extension.getURL('content.css')

  document.body.appendChild(link)
}