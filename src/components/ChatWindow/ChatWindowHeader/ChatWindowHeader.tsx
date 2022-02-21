import CloseIcon from 'icons/CloseIcon'

import { useChatContext } from 'hooks'

import {
  Container,
  CloseChatWindow,
  Text,
} from './style'

export const ChatWindowHeader = () => {
  const { setIsChatWindowOpen } = useChatContext()

  return (
    <Container>
      <Text>Chat</Text>
      <CloseChatWindow onClick={() => setIsChatWindowOpen(false)}>
        <CloseIcon />
      </CloseChatWindow>
    </Container>
  )
}
