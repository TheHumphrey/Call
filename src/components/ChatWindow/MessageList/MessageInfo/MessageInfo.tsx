import {
  MessageInfoContainer,
  NameParticipant,
  DateParticipant,
} from './style'

interface MessageInfoProps {
  author: string;
  dateCreated: string;
  isLocalParticipant: boolean;
}

export const MessageInfo = ({ author, dateCreated, isLocalParticipant }: MessageInfoProps) => {
  return (
    <MessageInfoContainer isLocalParticipant={isLocalParticipant}>
      <NameParticipant isLocalParticipant={isLocalParticipant} >
        {isLocalParticipant ? `${author}` : author}
      </NameParticipant>
      <DateParticipant >
        {dateCreated}
      </DateParticipant>
    </MessageInfoContainer>
  )
}
