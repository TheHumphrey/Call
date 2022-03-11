import styled from 'styled-components'

type TContainer = {
  hideParticipant?: boolean;
}

export const Container = styled.div<TContainer>`
  position: relative;
  display: ${({ hideParticipant }) => hideParticipant ? 'none' : 'flex'};
  align-items: center;
  height: 0;
  overflow: hidden;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  padding-top: ${'calc(65% - 2px)'};
  background: black;
  :hover {
    cursor: pointer;
  }
`

export const ContainerPrimary = styled.div<TContainer>`
  display: ${({ hideParticipant }) => hideParticipant ? 'none' : 'flex'};
  align-items: center;
  background: black;
`

export const InfoContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  
  flex-direction: column;
  justify-content: space-between;
  
  top: 0;
  z-index: 2;
  background: transparent;
`

export const InfoRowBottom = styled.div`
  position: absolute;
  display: flex;

  justify-content: space-between;

  bottom: 0;
  left: 0;
`

export const InfoRowTop = styled.div`
  position: absolute;
  display: flex;

  justify-content: space-between;

  top: 0;
  left: 0;
`

export const Identity = styled.div`
  display: flex;
  align-items: center;

  padding: 0.18em 0.3em;
  margin: 0;

  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.white};
`

export const Typography = styled.span`
  font-family: 'Roboto';
  color: ${({ theme }) => theme.colors.white};
`

export const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const ReconnectingContainer = styled.div`
  position: absolute;
  display: flex;

  align-items: center;
  justify-content: center;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: rgba(40, 42, 43, 0.75);
`

export const AvatarContainer = styled.div`
  position: absolute;
  display: flex;

  align-items: center;
  justify-content: center;
  
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: black;
`

