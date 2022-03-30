import React from 'react'
import { useChatContext } from 'hooks'

import { MessageList, ChatInput, ChatWindowHeader } from 'components'

import { ChatWindowContainer } from './style'

type TProps = {
  doctorStyle?: boolean;
}

export const ChatWindow = ({ doctorStyle }: TProps) => {
  const { isChatWindowOpen, messages, channel } = useChatContext()

  return (
    <ChatWindowContainer isChatWindowOpen={isChatWindowOpen} doctorStyle={doctorStyle}>
      <ChatWindowHeader />
      <MessageList messages={messages} />
      <ChatInput channel={channel!} isChatWindowOpen={isChatWindowOpen} />
    </ChatWindowContainer>
  )
}
