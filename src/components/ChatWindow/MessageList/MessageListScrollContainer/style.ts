import styled from 'styled-components'

import Button from '@material-ui/core/Button'

type TButton = {
  showButton?: boolean;
}

export const OuterContainer = styled.div`
  min-height: 0;
  flex: 1;
  position: relative;
`

export const InnerScrollContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 0 1.2em 0;`

export const MessageListContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  padding-bottom: 1em;`

export const ButtonCustom = styled(Button) <TButton>`
  position: absolute;
  bottom: ${({ showButton }) => showButton ? '24px' : '14px'};
  right: 2em;
  z-index: 100;
  padding: 0.5em 0.9em;
  visibility: ${({ showButton }) => showButton ? 'visible' : 'hidden'};
  opacity: ${({ showButton }) => showButton ? 1 : 0};
  box-shadow: 0px 4px 16px rgba(18, 28, 45, 0.2);
  transition: all 0.5s ease;
`