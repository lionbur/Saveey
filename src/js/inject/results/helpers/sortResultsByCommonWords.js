import { uniq } from 'lodash'

export default (items, commonWords) => {
  if (!commonWords) {
    return items
  }

  const getWordSet = name => uniq(name
    .toLowerCase()
    .split(' '))
  const nameRank = ({ name }) => getWordSet(name)
    .reduce((result, keywordInName) => result + (commonWords[keywordInName] || 0), 0)

  return items
    .slice()
    .sort((a, b) => nameRank(b) - nameRank(a))
}