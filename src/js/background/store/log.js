import { isObservableObject, toJS } from 'mobx'

const getSimpleObject = obj => isObservableObject(obj)
  ? toJS(obj)
  : Object.entries(obj)
    .reduce((result, [key, value]) => ([
      ...result,
      `UPDATE:${key}`,
      toJS(value)
    ]), [])

export default obj => console.log(...getSimpleObject(obj))