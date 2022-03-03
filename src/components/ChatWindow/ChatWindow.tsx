import React from 'react'
import { useChatContext } from 'hooks'

import { MessageList, ChatInput, ChatWindowHeader } from 'components'

import { ChatWindowContainer } from './style'

export const ChatWindow = () => {
  const { isChatWindowOpen, messages, channel } = useChatContext()

  return (
    <ChatWindowContainer isChatWindowOpen={isChatWindowOpen}>
      <ChatWindowHeader />
      <MessageList messages={messages} />
      <ChatInput channel={channel!} isChatWindowOpen={isChatWindowOpen} />
    </ChatWindowContainer>
  )
}
