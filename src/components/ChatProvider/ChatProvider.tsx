import React, { createContext, useEffect, useRef, useState } from 'react'
import { Client, Channel, Message } from 'twilio-chat'
import { useVideoContext } from 'hooks'

type ChatContextType = {
  isChatWindowOpen: boolean;
  setIsChatWindowOpen: (isChatWindowOpen: boolean) => void;
  connect: (token: string) => void;
  hasUnreadMessages: boolean;
  messages: Message[];
  channel: Channel | null;
}

export const ChatContext = createContext<ChatContextType>(null!)

export const ChatProvider: React.FC = ({ children }) => {
  const { room } = useVideoContext()
  const isChatWindowOpenRef = useRef(false)
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false)
  const [channel, setChannel] = useState<Channel | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false)
  const [chatClient, setChatClient] = useState<Client>()

  const connect = (token: string) => {
    const client = new Client(token)

    client.onWithReplay('stateChanged', state => {
      if (state === 'initialized') {
        window.chatClient = client
        setChatClient(client)
      }
    })
  }

  useEffect(() => {
    if (channel) {
      const handleMessageAdded = (message: Message) => setMessages(oldMessages => [...oldMessages, message])
      channel.getMessages().then((newMessages: any) => setMessages(newMessages.items))
      channel.on('messageAdded', handleMessageAdded)
      return () => {
        channel.off('messageAdded', handleMessageAdded)
      }
    }
  }, [channel])

  useEffect(() => {
    if (!isChatWindowOpenRef.current && messages.length) {
      setHasUnreadMessages(true)
    }
  }, [messages])

  useEffect(() => {
    isChatWindowOpenRef.current = isChatWindowOpen
    if (isChatWindowOpen) setHasUnreadMessages(false)
  }, [isChatWindowOpen])

  useEffect(() => {
    room && chatClient && getChannel(chatClient, room.sid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, chatClient])

  const getChannel = (chatClient: Client, sid: string) => {
    chatClient.getChannelByUniqueName(sid).then(channel => {
      window.chatConversation = channel
      setChannel(channel)
      channel.join()
    }).catch(() => {
      createChannel(chatClient, sid)
    })
  }

  const createChannel = (chatClient: Client, sid: string) => {
    chatClient.createChannel({ uniqueName: sid }).then((channel) => {
      window.chatConversation = channel
      setChannel(channel)
      channel.join()
    })
  }

  return (
    <ChatContext.Provider
      value={{ isChatWindowOpen, setIsChatWindowOpen, connect, hasUnreadMessages, messages, channel }}
    >
      {children}
    </ChatContext.Provider>
  )
}
