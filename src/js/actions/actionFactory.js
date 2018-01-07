export default type => {
  const result = payload => ({
    type,
    payload,
  })
  result.TYPE = type

  return result
}