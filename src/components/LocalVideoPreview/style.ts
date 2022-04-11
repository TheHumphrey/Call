import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  padding: 28.2%;
  height: 0;
  overflow: hidden;
  background: black;

  @media only screen and (max-width: 1366px) {
    padding: 27%;
  }
`

export const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`

export const IdentityContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  font-family: 'Roboto';
`

export const Identity = styled.span`
  background: rgba(0, 0, 0, 0.5);
  color:  white;
  padding: 0.18em 0.3em;
  margin: 0;
  display: flex;
  align-items: center;
`

export const Typography = styled.span`
  color: inherit;
`