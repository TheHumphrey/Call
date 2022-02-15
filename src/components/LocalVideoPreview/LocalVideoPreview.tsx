import React from 'react'
import AvatarIcon from 'icons/AvatarIcon'
import { LocalAudioTrack, LocalVideoTrack } from 'twilio-video'
import { useVideoContext } from 'hooks'
import AudioLevelIndicator from 'components/AudioLevelIndicator/AudioLevelIndicator'

import {
  AvatarContainer,
  Container,
  Identity,
  IdentityContainer,
  InnerContainer,
  Typography
} from './style'

import { VideoTrack } from 'components'

type TProps = {
  identity: string;
}



export const LocalVideoPreview = (props: TProps) => {
  const { identity } = props
  const { localTracks } = useVideoContext()

  const localAudioTrack = localTracks.find(track => track.kind === 'audio') as LocalAudioTrack

  const videoTrack = localTracks.find(
    track => !track.name.includes('screen') && track.kind === 'video'
  ) as LocalVideoTrack

  return (
    <Container>
      <InnerContainer>
        {videoTrack ? (
          <VideoTrack track={videoTrack} isLocal />
        ) : (
          <AvatarContainer>
            <AvatarIcon />
          </AvatarContainer>
        )}
      </InnerContainer>

      <IdentityContainer>
        <Identity>
          <AudioLevelIndicator audioTrack={localAudioTrack} />
          <Typography>
            {identity}
          </Typography>
        </Identity>
      </IdentityContainer>
    </Container>
  )
}