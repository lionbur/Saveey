import React from 'react'
import styled from 'styled-components'
import formatNum from 'format-num'

const Container = styled.div`
  width: 64px;
  text-align: right;
  display: flex;
  flex-direction: column;
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

const Row = styled.span``

const Price = ({ prefix, amount, currencyCode }) => (<Row>
  {prefix && <span>{prefix}</span>}
  <Currency>{currencyCode}</Currency>
  <Amount>{amount}</Amount>
</Row>)

export default ({ price, shippingCost }) => (<Container>
  <Price {...price}/>
  {shippingCost && <Price prefix={'\u2708'} {...shippingCost}/>}
</Container>)