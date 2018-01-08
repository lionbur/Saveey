import makeDraggable from './makeDraggable'
import createStyle from './createStyle'
import createIframe from './createIframe'

function createWindow(payload) {
  const { buyButton } = payload
  const winWidth = 500
  const winHeight = 300

  const root = document.createElement('div')
  root.className = 'sav-window'
  root.style.left = 0
  root.style.top = 0
  root.style.width = `${winWidth}px`
  root.style.height = `${winHeight}px`

  if (buyButton) {
    const { offset, width, height } = buyButton

    const docWidth = document.documentElement.clientWidth
    if (docWidth - offset.left > winWidth) {
      root.style.left = `${offset.left}px`
    } else {
      root.style.right = `${docWidth - offset.left - width}px`
    }
    root.style.top = `${offset.top + height * 1.25}px`
  }

  root.innerHTML = `
    <header>
      <span>Saveey</span>
      <button>X</button>
    </header>
  `

  root.querySelector('button').onclick = () => document.body.removeChild(root)
  root.appendChild(createIframe(payload))

  document.body.appendChild(root)
  makeDraggable(root)
}

export function createFloatingWindow(payload) {
  createStyle()
  createWindow(payload)
}