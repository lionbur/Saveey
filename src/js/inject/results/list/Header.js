import React from 'react'
import styled from 'styled-components'

import SortSelect from './SortSelect'

import SearchInput from './SearchInput'

const Container = styled.header`
  box-shadow: 0 0 7px rgba(0,0,0,.5);
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 20px;
`

export default ({ handleFilterChange, handleSortChange, sort }) => (
  <Container>
    <SearchInput
      onChange={handleFilterChange}
    />
    <SortSelect
      value={sort}
      onChange={handleSortChange}
    />
  </Container>
)