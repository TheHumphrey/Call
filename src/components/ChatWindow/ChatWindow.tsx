import React from 'react'
import { useChatContext } from 'hooks'

import { MessageList, ChatInput, ChatWindowHeader } from 'components'

import { ChatWindowContainer } from './style'

export const ChatWindow = () => {
  const { isChatWindowOpen, messages, conversation } = useChatContext()

  return (
    <ChatWindowContainer isChatWindowOpen={isChatWindowOpen}>
      <ChatWindowHeader />
      <MessageList messages={messages} />
      <ChatInput conversation={conversation!} isChatWindowOpen={isChatWindowOpen} />
    </ChatWindowContainer>
  )
}
