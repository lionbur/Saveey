import React from 'react'
import styled from 'styled-components'
import _Select from 'react-select'

import './react-select.css'
import { options } from './sortOrders'

const Container = styled.div`
  flex: 1;
  display: flex;
`

const LabelContainer = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  
  & span {
    color: rgba(0,0,0,.5);
    margin-right: 10px;
  }
`

const Label = ({ title, children }) => (<LabelContainer>
  <span>{title}</span>
  {children}
</LabelContainer>)

const Select = styled(_Select)`
  flex: 1;
`

export default ({ onChange, value }) => (
  <Container>
    <Label title="Sort by">
      <Select
        closeOnSelect
        simpleValue
        clearable={false}
        {...{ onChange, value, options }}
      />
    </Label>
  </Container>
)