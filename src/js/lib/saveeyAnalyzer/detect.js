import { detectBuyButton, detectPrice, detectProductName } from "."
import { getOffset } from './common'

export const detect = root => new Promise(resolve => {
  const buyButton = detectBuyButton(root)

  if (!buyButton) {
    return resolve({})
  }

  const { priceElement, parent } = detectPrice(buyButton.node.parentElement)
  const productName = detectProductName(parent, getOffset(priceElement).top)

  resolve({
    buyButton,
    priceElement,
    productName,
  })
})