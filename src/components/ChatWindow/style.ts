import styled from 'styled-components'

type TChatWindowContainer = {
  isChatWindowOpen?: boolean
}

export const ChatWindowContainer = styled.aside<TChatWindowContainer>`
  display: ${({ isChatWindowOpen }) => isChatWindowOpen ? 'flex' : 'none'}
  flex-direction: column
  height: 100vh

  background: '#FFFFFF'
  z-index: 9
  border-left: 1px solid #E4E7E9

  position: absolute

  top: 0
  right: 0
`