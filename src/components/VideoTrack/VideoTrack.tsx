import React, { useRef, useEffect } from 'react'
import { IVideoTrack } from 'types'
import { Track } from 'twilio-video'
import { useMediaStreamTrack, useVideoTrackDimensions } from 'hooks'

import { Video } from './style'

interface VideoTrackProps {
  track: IVideoTrack;
  isLocal?: boolean;
  priority?: Track.Priority | null;
}

export const VideoTrack = (props: VideoTrackProps) => {
  const { track, isLocal, priority } = props
  const ref = useRef<HTMLVideoElement>(null!)
  const mediaStreamTrack = useMediaStreamTrack(track)
  const dimensions = useVideoTrackDimensions(track)
  const isPortrait = (dimensions?.height ?? 0) > (dimensions?.width ?? 0)

  useEffect(() => {
    const el = ref.current
    el.muted = true
    if (track.setPriority && priority) {
      track.setPriority(priority)
    }
    track.attach(el)
    return () => {
      track.detach(el)

      el.srcObject = null

      if (track.setPriority && priority) {
        track.setPriority(null)
      }
    }
  }, [track, priority])

  const isFrontFacing = mediaStreamTrack?.getSettings().facingMode !== 'environment'
  const style = {
    transform: isLocal && isFrontFacing ? 'rotateY(180deg)' : '',
    objectFit: isPortrait || track.name.includes('screen') ? ('contain' as const) : ('cover' as const),
  }

  return <Video ref={ref} style={style} />
}
