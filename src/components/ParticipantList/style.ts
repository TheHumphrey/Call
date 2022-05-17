import styled from 'styled-components'

export const Container = styled.aside`
  background: black;
  grid-area: 1 / 2 / 1 / 3;
  z-index: 5;
  width: ${`calc(300px - 3em)`};
  justify-content: center;
  border-radius: 8px;
`

export const ContainerFull = styled.aside`
  width: 100vw;
  height: 100vh;
`