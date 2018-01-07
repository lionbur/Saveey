export const BY_RELEVANCY = 'Relevancy'
export const BY_PRICE_ASC = 'Price (low to high)'
export const BY_PRICE_DESC = 'Price (high to low)'
export const BY_NAME_ASC = 'Name (A to Z)'
export const BY_NAME_DESC = 'Name (Z to A)'

export const options = [
  BY_RELEVANCY,
  BY_PRICE_ASC,
  BY_PRICE_DESC,
  BY_NAME_ASC,
  BY_NAME_DESC,
].map(name => ({
  label: name,
  value: name,
}))