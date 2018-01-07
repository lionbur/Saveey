import React from 'react'
import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 64px;
  padding: 5px 20px;
  border-radius: 5px;
  transition: background-color 0.5s;
  cursor: pointer;
  
  &:nth-child(even) {
    background-color: rgba(0,0,0,.05);
  }

  &:hover {
    background-color: rgb(240,255,255);
  }
  
  price {
    width: 50px;
    text-align: right;
  }
`