import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Text = styled.div`
  text-align: center;
  color: rgba(0,0,0,.75);
`

export const ProductNameText = Text.extend`
  color: black;
  font-size: 120%;
`

export const LoaderContainer = styled.div`
  margin-top: 20px;
`

