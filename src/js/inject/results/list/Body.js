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

const getScoreText = value => value
  ? `${Array(Math.round((value || 0) / 20))
      .fill(null)
      .map(_ => '\u2b50')
      .join('')} `
  : ''

export default ({ data, filter }) => (
  <Container>
    {data.map(({ name, thumbnailUrl, price, url, shippingCost, sellerScore }, index) => (
      <ListItem key={`${url}${index}`} href={url}>
        <Image src={thumbnailUrl}/>
        <Name {...{filter}}>{`${getScoreText(sellerScore)}${name}`}</Name>
        <Price {...{price, shippingCost}} />
      </ListItem>))}
  </Container>
)