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
  ::-webkit-scrollbar {
    display: none !important;
  }
`

export const ButtonCustom = styled(Button)`
  min-width: auto !important;
  padding: 0;
  padding-bottom: 2px !important;
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

export const FileButtonContainer = styled.div`
  position: relative;
`

export const FileButtonLoadingSpinner = styled(CircularProgress)`
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  margin-top: -12 !important;
  margin-left: -12 !important;
`

export const TextAreaContainer = styled.div`
  display: flex;
  margin-top: 0.4em;
  padding: 0.48em 0.7em;
  width: 80%;
`

export const Container = styled.div<TTextContainer>`
  display: flex;
  border: 1px solid ${({ isTextareaFocused, theme }) => isTextareaFocused ? theme.colors.grayDark : theme.colors.grayLight};
  border-radius: 4px;
`

export const GridCustom = styled.div`
  display: flex;
  padding-top: 0.4em;
  padding-bottom: .4em;
  padding-right: .4em;
  width: auto;
  height: auto;
  align-items: flex-end;
`