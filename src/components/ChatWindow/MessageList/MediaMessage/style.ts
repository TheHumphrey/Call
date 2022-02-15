import styled from 'styled-components'

export const MessageContainer = styled.div`
  display: flex;
  padding: 0.9em 1.5em;
  margin: 0.6em 0;
  border: 2px solid #e4e7e9;
  border-radius: 4px;
  cursor: pointer;
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`

export const MediaInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1.5em;
  min-width: 0;
  p {
    margin: 0;
    font-size: 12px;
  }
`

export const Filename = styled.p`
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Size = styled.p`
  font-weight: 400;
`