import { without } from 'lodash'

const badWords = [ 'a' ]

export default name => without(name.split(' '), ...badWords).join(' ')
