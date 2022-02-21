import { Link } from '@material-ui/core'
import linkify from 'linkify-it'
import {
  MessageContainer,
  Container
} from './style'

interface TextMessageProps {
  body: string;
  isLocalParticipant: boolean;
}

const addLinks = (text: string) => {
  const matches = linkify().match(text)
  if (!matches) return text

  const results = []
  let lastIndex = 0

  matches.forEach((match, i) => {
    results.push(text.slice(lastIndex, match.index))
    results.push(
      <Link target="_blank" rel="noreferrer" href={match.url} key={i}>
        {match.text}
      </Link>
    )
    lastIndex = match.lastIndex
  })

  results.push(text.slice(lastIndex, text.length))

  return results
}

export const TextMessage = ({ body, isLocalParticipant }: TextMessageProps) => {

  return (
    <Container isLocalParticipant={isLocalParticipant}>
      <MessageContainer isLocalParticipant={isLocalParticipant}>
        <div>{addLinks(body)}</div>
      </MessageContainer>
    </Container>
  )
}
