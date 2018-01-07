import { intersection } from 'lodash'

const _calcHistogram = totalNames => (histogram, words, index) => words
  .trim()
  .toLowerCase()
  .split(/\s+/)
  .reduce((result, word) => ({
    ...result,
    [word]: (result[word] || 0) + 1.0 - 0.5 * (index / totalNames)
  }), histogram)

export default (keywords, names) => {
  const calcHistogram = _calcHistogram(names.length + 1)
  const rawHistogram = names
    .concat(keywords)
    .reduce(calcHistogram, {})
  const histogram = Object
    .entries(rawHistogram)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)

  const sumCount = histogram
    .reduce((result, { count }) => result + count, 0)
  const averageCount = sumCount / histogram.length

  return intersection(
    keywords.split(' '),
    histogram
      .filter(({ count }) => count >= averageCount)
      .map(({ word }) => word)
  )
    .reduce((result, word) => ({
      ...result,
      [word]: rawHistogram[word]
    }), {})
}