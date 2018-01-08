import React from 'react'
import styled from 'styled-components'

import ListItem from './ListItem'
import Image from './Image'
import Name from './Name'
import Price from './Price'

const Container = styled.section`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({ data, filter }) => (
  <Container>
    {data.map(({ name, thumbnailUrl, price, url, shippingCost }, index) => (
      <ListItem key={`${url}${index}`} href={url}>
        <Image src={thumbnailUrl}/>
        <Name {...{filter}}>{name}</Name>
        <Price {...{price, shippingCost}} />
      </ListItem>))}
  </Container>
)