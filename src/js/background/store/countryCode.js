let countryCode = null

export async function getCountryCode() {
  if (!countryCode) {
    const response = await fetch('http://freegeoip.net/json/')
    const {country_code} = await response.json()
    countryCode = country_code
  }

  return countryCode
}