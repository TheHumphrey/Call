import { Media } from '@twilio/conversations'

import FileDownloadIcon from 'icons/FileDownloadIcon'

import {
  MessageContainer,
  IconContainer,
  MediaInfo,
  Filename,
  Size,
} from './style'

interface MediaMessageProps {
  media: Media;
}

export const formatFileSize = (bytes: number, suffixIndex = 0): string => {
  const suffixes = ['bytes', 'KB', 'MB', 'GB']
  if (bytes < 1000) return +bytes.toFixed(2) + ' ' + suffixes[suffixIndex]
  return formatFileSize(bytes / 1024, suffixIndex + 1)
}

export const FileMessage = ({ media }: MediaMessageProps) => {

  const handleClick = () => {
    media.getContentTemporaryUrl().then(url => {
      const anchorEl = document.createElement('a')

      anchorEl.href = url
      anchorEl.target = '_blank'
      anchorEl.rel = 'noopener'

      setTimeout(() => {
        anchorEl.click()
      })
    })
  }

  return (
    <MessageContainer onClick={handleClick}>
      <IconContainer>
        <FileDownloadIcon />
      </IconContainer>
      <MediaInfo>
        <Filename>{media.filename}</Filename>
        <Size>{formatFileSize(media.size)} - Click to open</Size>
      </MediaInfo>
    </MessageContainer>
  )
}
