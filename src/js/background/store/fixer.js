let localCurrencyCode = null
let rates = null

async function getRates(baseCurrencyCode = 'ILS') {
  if (!rates) {
    localCurrencyCode = baseCurrencyCode

    const response = await fetch(`https://api.fixer.io/latest?base=${baseCurrencyCode}`)
    const json = await response.json()
    rates = json.rates
  }

  return rates
}

function tryConvertPrice(price) {
  if (!price || !rates) {
    return price
  }

  const { amount, currencyCode } = price

  if (!rates[currencyCode]) {
    return { amount, currencyCode }
  }

  return {
    amount: amount / rates[currencyCode],
    currencyCode: localCurrencyCode,
    original: price,
  }
}

export const tryFixPrices = async items => {
  await getRates()

  return items
    .map(({ price, shippingCost, ...rest }) => ({
      price: tryConvertPrice(price),
      shippingCost: tryConvertPrice(shippingCost),
      ...rest
    }))
}