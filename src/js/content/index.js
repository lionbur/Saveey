import { detect } from "../lib/saveeyAnalyzer"

import { createFloatingWindow } from "./floatingWindow"

(async function () {
  try {
    const { productName, buyButton, butButtonOffset } = await detect(document.body)

    if (productName) {
      createFloatingWindow({
        productName,
        buyButton: {
          innerText: buyButton.button.innerText,
          offset: buyButton.offset,
          width: buyButton.button.clientWidth,
          height: buyButton.button.clientHeight,
        },
      })
    }
  } catch (error) {
//    chrome.runtime.sendMessage(detectedProduct.failure(error))
  }
})()