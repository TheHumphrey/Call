import styled from 'styled-components'

type TNameParticipant = {
  isLocalParticipant?: boolean;
}

export const MessageInfoContainer = styled.div<TNameParticipant>`
  display: flex;
  align-items: center;
  justify-content: ${({ isLocalParticipant }) => isLocalParticipant ? 'flex-end' : 'flex-start'};
  padding: 1.425em 0 0.083em;
  font-size: 0.7em;
  font-family: 'Roboto';
`

export const NameParticipant = styled.div<TNameParticipant>`
  color: ${({ isLocalParticipant, theme }) => isLocalParticipant ? theme.colors.blueMedium : theme.colors.grayDark};
  margin-right: 1em;
`

export const DateParticipant = styled.div`
  color: ${({ theme }) => theme.colors.black};
`