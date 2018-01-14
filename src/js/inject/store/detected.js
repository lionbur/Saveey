import { observable } from 'mobx'

export default observable.shallowObject({
  productName: null,
  url: null,
  keywords: null,
  commonWords: null,
})
