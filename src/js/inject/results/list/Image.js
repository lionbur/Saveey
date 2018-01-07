import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  mix-blend-mode: multiply;
  max-width: 64px;
  max-height: 64px;
`

const Container = styled.div`
  align-items: center;
  justify-content: center;
  min-width: 64px;
  min-height: 64px;  
  border-radius: 20px;
  overflow: hidden;
`

export default ({ src, ...rest }) => (
  <Container {...rest}>
    <Image {...{src}}/>
  </Container>
)