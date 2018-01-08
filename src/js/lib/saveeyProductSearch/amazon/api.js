import signAsync from './signAsync'
import getXmlFromUrl from './getXmlFromUrl'
import queryParamsSorted from './queryParamsSorted'
import xmlNodeToJson from '../common/xmlNodeToJson'

const getNowTimestamp = () => new Date().toISOString()

const capitalize = s => `${s.substring(0, 1).toUpperCase()}${s.substring(1)}`

const makeCapitalizedKeys = obj => Object
  .entries(obj)
  .reduce((result, [key, value]) => ({
    ...result,
    [capitalize(key)]: value,
  }), {})

export default class {
  awsId = null
  awsTag = null
  awsSecret = null
  endpoint = 'webservices.amazon.com'
//  endpoint = 'webservices.amazon.co.uk'
  uri = '/onca/xml'

  constructor ({ awsId, awsTag, awsSecret }) {
    Object.assign(this, { awsId, awsTag, awsSecret })
  }

  signParams = async params => {
    const { endpoint, uri, awsSecret } = this
    const stringToSign = `GET\n${endpoint}\n${uri}\n${params}`
    const base64 = await signAsync(awsSecret, stringToSign)

    return `${params}&Signature=${encodeURIComponent(base64)}`
  }

  makeOperation = operation => async (
    {
      responseGroup = 'ItemAttributes,OfferFull,Images',
      searchIndex = 'All',
      service = 'AWSECommerceService',
      ...rest
    }) => {
    const signedQuery = await this.signParams(
      queryParamsSorted(
        makeCapitalizedKeys({
          AWSAccessKeyId: this.awsId,
          AssociateTag: this.awsTag,
          operation,
          responseGroup,
          searchIndex,
          service,
          timestamp: getNowTimestamp(),
          ...rest,
        })
      )
    )

    const { endpoint, uri  } = this
    const url = `https://${endpoint}${uri}?${signedQuery}`

    return this.fetch(url)
  }

  fetch = async url => xmlNodeToJson(await getXmlFromUrl(url))

  itemSearch = this.makeOperation('ItemSearch')
}