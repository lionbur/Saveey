import { observable, action } from 'mobx'

import { ebayItemSearch } from "../../lib/saveeyProductSearch/index"
import { getCountryCode } from "./countryCode"
import { tryFixPrices } from "./fixer"
import log from './log'

class eBayStore {
  itemSearch = async keywords => tryFixPrices(await ebayItemSearch({
        keywords,
        availableToCountryCode: await getCountryCode(),
      }))
}
export default new eBayStore()