export default function (element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  const header = element.querySelector('header')
  if (header) {
    // if present, the header is where you move the element from:
    header.onmousedown = dragMouseDown
  } else {
    // otherwise, move the DIV from anywhere inside the element:
    element.onmousedown = dragMouseDown
  }

  function dragMouseDown(e) {
    element.classList.add('moving')

    e = e || window.event
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    element.style.top = (element.offsetTop - pos2) + 'px'
    element.style.left = (element.offsetLeft - pos1) + 'px'
  }

  function closeDragElement() {
    element.classList.remove('moving')
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
