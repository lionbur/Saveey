import { detect } from "./lib/saveeyAnalyzer"
import { amazonItemSearch } from './lib/saveeyProductSearch'

const { productName } = detect(document.body)

if (productName) {
  amazonItemSearch(productName)
}
