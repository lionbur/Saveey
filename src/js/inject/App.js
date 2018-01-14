import { observer } from 'mobx-react'
import React from 'react'
import Results from './results'

import './messageSink'
import './store/debug'
import { results } from './store'

export default observer(() => (results.items.length
  ? <Results items={results.items}/>
  : null)
)