import { LocalAudioTrack } from 'twilio-video'
import AudioLevelIndicator from "components/AudioLevelIndicator/AudioLevelIndicator"
import { useVideoContext, useLocalAudioToggle } from "hooks"

import { IconButton } from "./style"

export const ToggleAudioButton = (props: { disabled?: boolean; className?: string, fill?: string }) => {
  const { disabled, className, fill } = props
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle()
  const { localTracks } = useVideoContext()

  const hasAudioTrack = localTracks.some(track => track.kind === 'audio')

  const localAudioTrack = localTracks.find(track => track.kind === 'audio') as LocalAudioTrack

  return (
    <>
      <IconButton
        className={className}
        onClick={toggleAudioEnabled}
        isEnable={isAudioEnabled}
        disabled={!hasAudioTrack || disabled}
      >
        <AudioLevelIndicator audioTrack={localAudioTrack} disabled={!hasAudioTrack || disabled} fill={fill} />
      </IconButton>
    </>
  )
}