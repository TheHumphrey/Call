import { CircularProgress, Button } from '@material-ui/core'
import styled from 'styled-components'

import TextareaAutosize from '@material-ui/core/TextareaAutosize'

type TTextContainer = {
  isTextareaFocused?: boolean;
}

export const ChatInputContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.whiteMedium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.whiteMedium};
  padding: 1em 1.2em 1em;
  background: ${({ theme }) => theme.colors.white};
`

export const TextArea = styled(TextareaAutosize)`
  width: 100%;
  border: 0;
  resize: none;
  font-size: 14px;
  font-family: 'Roboto';
  outline: none;
`

export const ButtonCustom = styled(Button)`
  padding: 0.56em;
  min-width: auto;
`

export const ButtonContainer = styled.div`
  margin: 1em 0 0 1em;
  display: flex;
`

export const FileButtonContainer = styled.div`
  position: relative;
  margin-right: 1em;
`

export const FileButtonLoadingSpinner = styled(CircularProgress)`
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  margin-top: -12 !important;
  margin-left: -12 !important;
`

export const TextAreaContainer = styled.div<TTextContainer>`
  display: flex;
  margin-top: 0.4em;
  padding: 0.48em 0.7em;
  border: 2px solid ${({ isTextareaFocused, theme }) => isTextareaFocused ? theme.colors.grayDark : 'transparent'};
  border-radius: ${({ isTextareaFocused }) => isTextareaFocused ? '4px' : '0px'};
`