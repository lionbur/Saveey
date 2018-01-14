import React from 'react'
import { PropagateLoader } from 'react-spinners'

import { Container } from "./Results.styled"
import List from './list'

export default ({ items }) => (<Container>
  <List {...{items}}/>
</Container>)