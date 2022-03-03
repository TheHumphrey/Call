import styled from "styled-components"

type TMessageContainerProps = {
  isLocalParticipant?: boolean;
}

export const MessageContainer = styled.div<TMessageContainerProps>`
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  padding: 0.5em 0.8em 0.6em;
  margin: 0.3em 0 0;
  word-break: break-word;
  background-color: ${({ isLocalParticipant }) => isLocalParticipant ? '#CCE4FF' : '#E1E3EA'};
  hyphens: auto;
  white-space: pre-wrap;
  font-family: 'Roboto';
`

export const Container = styled.div<TMessageContainerProps>`
  display: flex;
  justify-content: ${({ isLocalParticipant }) => isLocalParticipant ? 'flex-end' : 'flex-start'};
`