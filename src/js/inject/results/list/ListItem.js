import React from 'react'
import styled from 'styled-components'

export default styled.a.attrs({
  target: '_blank',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 64px;
  padding: 5px 20px;
  border-radius: 5px;
  transition: background-color 0.5s;
  transition: text-decoration-color 0.5s;
  cursor: pointer;
  
  &:nth-child(even) {
    background-color: rgba(0,0,0,.05);
  }

  text-decoration-color: transparent;
  &:hover {
    background-color: rgb(240,255,255);
    text-decoration-color: currentcolor;
  }
`