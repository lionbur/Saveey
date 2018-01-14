import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { createFilter } from 'react-search-input'

import sortResultsByCommonWords from '../helpers/sortResultsByCommonWords'
import { BY_RELEVANCY, BY_PRICE_ASC, BY_PRICE_DESC, BY_NAME_ASC, BY_NAME_DESC } from "./sortOrders"
import { detected } from '../../store'
import Header from './Header'
import Body from './Body'

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`


const KEYS_TO_FILTERS = [ 'name' ]

const sorters = {
  [BY_RELEVANCY]: items => sortResultsByCommonWords(items, detected.commonWords),
  [BY_PRICE_ASC]: items => items
    .sort((a, b) => a.price.amount - b.price.amount),
  [BY_PRICE_DESC]: items => items
    .sort((a, b) => b.price.amount - a.price.amount),
  [BY_NAME_ASC]: items => items
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
  [BY_NAME_DESC]: items => items
    .sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase())),
}

let instanceId = 1

@observer class List extends Component {
  @observable filter = ''
  @observable sort = BY_RELEVANCY

  handleFilterChange(filter) {
    this.filter = filter
  }

  handleSortChange(sort) {
    this.sort = sort
  }

  componentWillMount() {
    this.instanceId = instanceId++
  }

  render() {
    const { filter } = this
    const { items } = this.props

    console.log('render', items, this.instanceId)

    const filteredItems = sorters[this.sort](
      items.filter(createFilter(this.filter, KEYS_TO_FILTERS))
    )

    return (<Container>
      <Header
        handleFilterChange={this.handleFilterChange.bind(this)}
        sort={this.sort}
        handleSortChange={this.handleSortChange.bind(this)}
      />
      <Body
        data={filteredItems}
        {...{filter}}
      />
    </Container>)
  }
}

export default List
