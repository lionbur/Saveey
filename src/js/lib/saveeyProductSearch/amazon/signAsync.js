export default async (secretKey, data) => {
  const enc = new TextEncoder('utf-8')

  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secretKey),
    {
      name: 'HMAC',
      hash: { name: 'SHA-256' },
    },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    enc.encode(data)
  )

  return btoa(String.fromCharCode(...new Uint8Array(signature)))
}
