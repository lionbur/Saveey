import { detectBuyButton, detectPrice, detectProductName } from "."
import { getOffset } from './common'

export function detect (root) {
  const buyButton = detectBuyButton(root)

  if (!buyButton) {
    return {}
  }

  const { priceElement, parent } = detectPrice(buyButton.node.parentElement)
  const productName = detectProductName(parent, getOffset(priceElement).top)

  return {
    buyButton,
    priceElement,
    productName,
  }
}