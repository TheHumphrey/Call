import styled from 'styled-components'

type TContainer = {
  hideParticipant?: boolean;
}

type TInnerContainer = {
  doctorStyle?: boolean;
  isChatWindowOpen?: boolean;
  isPrimaryCam?: boolean;
}

export const Container = styled.div<TContainer>`
  position: relative;
  display: ${({ hideParticipant }) => hideParticipant ? 'none' : 'flex'};
  align-items: center;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
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

export const InfoContainer = styled.div<TInnerContainer>`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  
  flex-direction: column;
  justify-content: space-between;
  
  top: ${({ doctorStyle }) => doctorStyle ? '5%' : '0'};
  left: ${({ doctorStyle }) => doctorStyle ? '43%' : '0'};

  ${({ isChatWindowOpen, isPrimaryCam, doctorStyle }) => isChatWindowOpen && isPrimaryCam && doctorStyle && 'left: 38.4% !important;'}
  ${({ isChatWindowOpen, isPrimaryCam, doctorStyle }) => isChatWindowOpen && isPrimaryCam && doctorStyle && 'top: 4.2% !important;'}
  
  z-index: 2;
  background: transparent;
`

export const InfoRowBottom = styled.div<TInnerContainer>`
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

export const Identity = styled.div<TInnerContainer>`
  display: flex;
  align-items: center;

  padding: 0.18em 0.3em;
  margin: 0;

  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ doctorStyle }) => doctorStyle ? '8px 0px 0px 0px' : '0px'};
`

export const Typography = styled.span`
  font-family: 'Roboto';
  color: ${({ theme }) => theme.colors.white};
`

export const InnerContainer = styled.div<TInnerContainer>`
  position: absolute;
  top: ${({ doctorStyle }) => doctorStyle ? '5%' : '0'};
  left: ${({ doctorStyle }) => doctorStyle ? '43%' : '0'};
  width: ${({ doctorStyle }) => doctorStyle ? '50%' : '100%'};
  height: ${({ doctorStyle }) => doctorStyle ? '43%' : '100%'};
  border-radius: 8px;

  ${({ isChatWindowOpen, doctorStyle }) => isChatWindowOpen && doctorStyle && 'left: 38.4% !important;'}
  ${({ isChatWindowOpen, doctorStyle }) => isChatWindowOpen && doctorStyle && 'width: 40% !important;'}
  ${({ isChatWindowOpen, doctorStyle }) => isChatWindowOpen && doctorStyle && 'top: 4.2% !important;'}
  ${({ isChatWindowOpen, doctorStyle }) => isChatWindowOpen && doctorStyle && 'height: 44.5% !important;'}
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

export const AvatarContainer = styled.div<TInnerContainer>`
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
  border-radius: ${({ doctorStyle }) => doctorStyle ? '8px' : '0px'};
`

