import styled from 'styled-components'

export const Container = styled.aside`
  background: black;
  grid-area: 1 / 2 / 1 / 3;
  z-index: 5;
  width: ${`calc(300px - 3em)`};
  justify-content: center;
  border-radius: 2px;

  @media only screen and (max-width: 911px) {
    width: ${`calc(250px - 3em)`};
  }
`

export const ContainerFull = styled.aside`
  width: 100vw;
  height: 100vh;
`