import React, { useEffect, useRef, useState } from 'react'
import { Channel } from 'twilio-chat'
import { isMobile } from 'utils'
import FileAttachmentIcon from 'icons/FileAttachmentIcon'
import SendMessageIcon from 'icons/SendMessageIcon'
import { Snackbar } from 'components'

import {
  ButtonCustom,
  ButtonContainer,
  ChatInputContainer,
  Container,
  FileButtonContainer,
  FileButtonLoadingSpinner,
  TextArea,
  GridCustom,
  TextAreaContainer,
} from './style'
import { theme } from 'styles/theme'

interface ChatInputProps {
  channel: Channel;
  isChatWindowOpen: boolean;
}

const ALLOWED_FILE_TYPES =
  'audio/*, image/*, text/*, video/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document .xslx, .ppt, .pdf, .key, .svg, .csv'

export const ChatInput = ({ channel, isChatWindowOpen }: ChatInputProps) => {
  const [messageBody, setMessageBody] = useState('')
  const [isSendingFile, setIsSendingFile] = useState(false)
  const [fileSendError, setFileSendError] = useState<string | null>(null)
  const isValidMessage = /\S/.test(messageBody)
  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isTextareaFocused, setIsTextareaFocused] = useState(false)

  useEffect(() => {
    if (isChatWindowOpen) {
      textInputRef.current?.focus()
    }
  }, [isChatWindowOpen])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageBody(event.target.value)
  }

  const handleReturnKeyPress = (event: React.KeyboardEvent) => {
    if (!isMobile && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage(messageBody)
    }
  }

  const handleSendMessage = async (message: string) => {
    if (isValidMessage) {
      await channel.sendMessage(message).then(e => console.log(e)).catch(e => console.log(e))
      setMessageBody('')
    }
  }

  const handleSendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      var formData = new FormData()
      formData.append('userfile', file)
      setIsSendingFile(true)
      setFileSendError(null)
      channel
        .sendMessage(formData)
        .catch(e => {
          if (e.code === 413) {
            setFileSendError('File size is too large. Maximum file size is 150MB.')
          } else {
            setFileSendError('There was a problem uploading the file. Please try again.')
          }
          console.log('Problem sending file: ', e)
        })
        .finally(() => {
          setIsSendingFile(false)
        })
    }
  }

  return (
    <ChatInputContainer>
      <Snackbar
        open={Boolean(fileSendError)}
        headline="Error"
        message={fileSendError || ''}
        variant="error"
        handleClose={() => setFileSendError(null)}
      />
      <Container isTextareaFocused={isTextareaFocused}>
        <TextAreaContainer>
          <TextArea
            minRows={1}
            maxRows={6}
            aria-label="chat input"
            placeholder="Escreva uma mensagem..."
            onKeyPress={handleReturnKeyPress}
            onChange={handleChange}
            value={messageBody}
            data-cy-chat-input
            ref={textInputRef}
            onFocus={() => setIsTextareaFocused(true)}
            onBlur={() => setIsTextareaFocused(false)}
          />
        </TextAreaContainer>

        <GridCustom >
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleSendFile}
            value={''}
            accept={ALLOWED_FILE_TYPES}
          />
          <ButtonContainer>
            <FileButtonContainer>
              <ButtonCustom onClick={() => fileInputRef.current?.click()} disabled={isSendingFile}>
                <FileAttachmentIcon />
              </ButtonCustom>

              {isSendingFile && <FileButtonLoadingSpinner size={24} />}
            </FileButtonContainer>

            <ButtonCustom
              onClick={() => handleSendMessage(messageBody)}
              color="primary"
              variant="contained"
              // disabled={!isValidMessage}
              data-cy-send-message-button
            >
              <SendMessageIcon />
            </ButtonCustom>
          </ButtonContainer>
        </GridCustom>
      </Container>
    </ChatInputContainer>
  )
}
