export default function isElementVisible(el) {
//-- Cross browser method to get style properties:
  function _getStyle(el, property) {
    if ( window.getComputedStyle ) {
      return document.defaultView.getComputedStyle(el,null)[property];
    }
    if ( el.currentStyle ) {
      return el.currentStyle[property];
    }
  }

  var p = el.parentNode;

  if (9 === p.nodeType) {
    return true; // document type
  }

  //-- Return false if our element is invisible
  if (
    '0' === _getStyle(el, 'opacity') ||
    'none' === _getStyle(el, 'display').replace(/\s!important/i, '') ||
    'hidden' === _getStyle(el, 'visibility')
  ) {
    return false;
  }

  //-- Let's recursively check upwards:
  if (p) {
    return isElementVisible(p);
  }

  return true;
}


