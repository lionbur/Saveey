import { intersection } from 'lodash'

const calcHistogram = (histogram, words) => words
  .trim()
  .toUpperCase()
  .split(/\s+/)
  .reduce((result, word) => ({
    ...result,
    [word]: (result[word] || 0) + 1
  }), histogram)

export default (keywords, names) => {
  const histogram = Object
    .entries(names
      .concat(keywords)
      .reduce(calcHistogram, {})
    )
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)

  const sumCount = histogram
    .reduce((result, { count }) => result + count, 0)
  const averageCount = sumCount / histogram.length

  return intersection(
    keywords.split(' '),
    histogram
      .filter(({ count }) => count >= averageCount)
      .map(({ word }) => word.toLowerCase())
  )
}