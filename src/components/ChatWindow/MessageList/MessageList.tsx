import React from 'react'
import { Message } from 'twilio-chat'
import { useVideoContext } from 'hooks'
import { FileMessage, MessageInfo, TextMessage } from 'components'
import MessageListScrollContainer from './MessageListScrollContainer/MessageListScrollContainer'

interface MessageListProps {
  messages: Message[];
}

const getFormattedTime = (message?: Message) =>
  message?.dateCreated.toLocaleTimeString('pt-Br', { hour: 'numeric', minute: 'numeric' }).toLowerCase()

export const MessageList = ({ messages }: MessageListProps) => {
  const { room } = useVideoContext()
  const localParticipant = room!.localParticipant

  return (
    <MessageListScrollContainer messages={messages}>
      {messages.map((message, idx) => {
        const time = getFormattedTime(message)!
        const previousTime = getFormattedTime(messages[idx - 1])

        const shouldDisplayMessageInfo = time !== previousTime || message.author !== messages[idx - 1]?.author

        const isLocalParticipant = localParticipant.identity === message.author

        return (
          <React.Fragment key={message.sid}>
            {shouldDisplayMessageInfo && (
              <MessageInfo author={message.author} isLocalParticipant={isLocalParticipant} dateCreated={time} />
            )}
            {message.type === 'text' && <TextMessage body={message.body} isLocalParticipant={isLocalParticipant} />}
            {message.type === 'media' && <FileMessage media={message.media} />}
          </React.Fragment>
        )
      })}
    </MessageListScrollContainer>
  )
}
