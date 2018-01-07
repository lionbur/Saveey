import React from 'react'
import styled from 'styled-components'

import ListItem from './ListItem'
import Image from './Image'
import Name from './Name'

const Container = styled.section`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({ data, filter }) => (
  <Container>
    {data.map(({ name, thumbnailUrl, price: {amount}, url }, index) => (
      <ListItem key={`${url}${index}`}>
        <Image src={thumbnailUrl}/>
        <Name {...{filter}}>{name}</Name>
        <price>{amount}</price>
      </ListItem>))}
  </Container>
)