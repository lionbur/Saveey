import React from 'react'
import { observer } from 'mobx-react'
import { PropagateLoader } from 'react-spinners'

import { detected } from '../store'
import { results } from '../store'
import { Container, Text, ProductNameText, LoaderContainer } from "./Results.styled"
import List from './list'

export default observer(() => (<Container>
  {results.isEmpty && <div>
    <Text>Please wait while we are searching for</Text>
    <ProductNameText>{ detected.productName }</ProductNameText>
    <Text>across the web ...</Text>
  </div>}
  {!results.isEmpty && <List/>}
  {results.isEmpty && <LoaderContainer>
    <PropagateLoader
      loading={results.isEmpty}
    />
  </LoaderContainer>}
</Container>))