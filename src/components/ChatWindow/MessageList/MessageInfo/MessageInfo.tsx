import { MessageInfoContainer } from './style'

interface MessageInfoProps {
  author: string;
  dateCreated: string;
  isLocalParticipant: boolean;
}

export const MessageInfo = ({ author, dateCreated, isLocalParticipant }: MessageInfoProps) => {
  return (
    <MessageInfoContainer>
      <div>{isLocalParticipant ? `${author} (You)` : author}</div>
      <div>{dateCreated}</div>
    </MessageInfoContainer>
  )
}
