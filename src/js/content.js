import { detectBuyButton } from "./lib/saveeyAnalyzer/buyButton"

const buyBytton = detectBuyButton(document.body)
if (buyButton) {
  buyButton.style.border = '2px solid red'
}