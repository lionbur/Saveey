import React from 'react'
import styled from 'styled-components'
import _Highlighter from 'react-highlight-words'

const Highlighter = styled(_Highlighter)`
  flex: 1;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  max-height: 64px;
  line-height: 20px;
`

export default ({ children, filter, ...rest }) => (
  <Highlighter
    autoEscape
    searchWords={filter.split(' ')}
    textToHighlight={children}
  />
)