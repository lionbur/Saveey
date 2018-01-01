import queryParams from './queryParams'

const uri = 'https://translate.googleapis.com/translate_a/single?'

export default async (text, { from, to }) => {
  const response = await fetch(
    `${uri}${queryParams({
      client: 'gtx',
      dt: 't',
      sl: from || 'auto',
      tl: to,
      q: text,
    })}`, {
    mode: 'cors',
  })
  const json = await response.json()

  console.log({
    source: text,
    english: json[0][0][0]
  })

  return json[0][0][0]
}