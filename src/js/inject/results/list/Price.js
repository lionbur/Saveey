import React from 'react'
import styled from 'styled-components'
import formatNum from 'format-num'

const Container = styled.div`
  width: 64px;
  text-align: right;
`

const Currency = styled.span`
  font-size: 75%;
  margin-right: 2px;
`

const amountFormat = {
  minFraction: 2,
}
const formatAmount = value => formatNum(value, amountFormat)

const Amount = ({ children }) => (<span>
  {children && formatAmount(children)}
</span>)

export default ({ amount, currencyCode }) => (<Container>
  <Currency>{currencyCode}</Currency>
  <Amount>{amount}</Amount>
</Container>)