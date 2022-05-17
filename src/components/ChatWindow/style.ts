import styled from 'styled-components'

type TChatWindowContainer = {
  isChatWindowOpen?: boolean;
  doctorStyle?: boolean;
}

export const ChatWindowContainer = styled.aside<TChatWindowContainer>`
  display: ${({ isChatWindowOpen }) => isChatWindowOpen ? 'flex' : 'none'};
  flex-direction: column;
  height: 100vh;
  width: 20vw;

  background: '#FFFFFF';
  z-index: 9;
  border-left: 2px solid ${({ doctorStyle, theme }) => doctorStyle ? theme.colors.whiteDark : '#E4E7E9'} ;

  position: absolute;

  top: 0;
  right: 0;
`