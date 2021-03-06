import React from 'react'

import { useTrack } from 'hooks'
import { AudioTrack, VideoTrack } from 'components'

import { IVideoTrack } from 'types'
import {
  AudioTrack as IAudioTrack,
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
  Track,
} from 'twilio-video'

interface PublicationProps {
  publication: LocalTrackPublication | RemoteTrackPublication;
  participant: Participant;
  isLocalParticipant?: boolean;
  videoOnly?: boolean;
  videoPriority?: Track.Priority | null;
  doctorStyle?: boolean;
  withBorder?: boolean;
}

export const Publication = ({ publication, isLocalParticipant, videoOnly, videoPriority, doctorStyle, withBorder }: PublicationProps) => {
  const track = useTrack(publication)

  if (!track) return null

  switch (track.kind) {
    case 'video':
      return (
        <VideoTrack
          track={track as IVideoTrack}
          priority={videoPriority}
          isLocal={!track.name.includes('screen') && isLocalParticipant}
          doctorStyle={doctorStyle}
          withBorder={withBorder}
        />
      )
    case 'audio':
      return videoOnly ? null : <AudioTrack track={track as IAudioTrack} />
    default:
      return null
  }
}
