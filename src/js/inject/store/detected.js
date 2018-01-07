import { observable } from 'mobx'

export default observable.shallowObject({
  productName: null,
  keywords: null,
  commonWords: null,
})
