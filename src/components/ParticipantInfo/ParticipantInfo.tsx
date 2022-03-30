import React from 'react'
import { LocalAudioTrack, LocalVideoTrack, Participant, RemoteAudioTrack, RemoteVideoTrack } from 'twilio-video'

import { NetworkQualityLevel, } from 'components'
import AvatarIcon from 'icons/AvatarIcon'
import PinIcon from './PinIcon/PinIcon'

import {
  Container as ContainerFull,
  ContainerPrimary,
  InfoContainer,
  InfoRowBottom,
  InfoRowTop,
  Identity,
  Typography,
  InnerContainer,
  ReconnectingContainer,
  AvatarContainer
} from './style'

import { useIsTrackSwitchedOff, usePublications, useTrack, useParticipantIsReconnecting } from 'hooks'
import AudioLevelIndicator from 'components/AudioLevelIndicator/AudioLevelIndicator'

interface ParticipantInfoProps {
  participant: Participant;
  children: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  isPrimaryCam?: boolean;
  isLocalParticipant?: boolean;
  hideParticipant?: boolean;
  doctorStyle?: boolean;
}

export const ParticipantInfo = ({
  participant,
  onClick,
  isSelected,
  children,
  isPrimaryCam,
  isLocalParticipant,
  hideParticipant,
  doctorStyle,
}: ParticipantInfoProps) => {
  const publications = usePublications(participant)

  const Container = isPrimaryCam ? ContainerPrimary : ContainerFull
  const InfoRow = isPrimaryCam ? InfoRowTop : InfoRowBottom

  const audioPublication = publications.find(p => p.kind === 'audio')
  const videoPublication = publications.find(p => !p.trackName.includes('screen') && p.kind === 'video')

  const isVideoEnabled = Boolean(videoPublication)

  const videoTrack = useTrack(videoPublication)
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack as LocalVideoTrack | RemoteVideoTrack)

  const audioTrack = useTrack(audioPublication) as LocalAudioTrack | RemoteAudioTrack | undefined
  const isParticipantReconnecting = useParticipantIsReconnecting(participant)

  return (
    <Container
      onClick={onClick}
      data-cy-participant={participant.identity}
      hideParticipant={hideParticipant}
    >
      <InfoContainer doctorStyle={doctorStyle}>
        {!isPrimaryCam && (<NetworkQualityLevel participant={participant} />)}
        <InfoRow >
          <Identity >
            <AudioLevelIndicator audioTrack={audioTrack} />
            <Typography >
              {participant.identity}
            </Typography>
          </Identity>
          {isPrimaryCam && (<NetworkQualityLevel participant={participant} />)}
        </InfoRow>
        <div>{isSelected && <PinIcon />}</div>
      </InfoContainer>
      <InnerContainer doctorStyle={doctorStyle}>
        {(!isVideoEnabled || isVideoSwitchedOff) && (
          <AvatarContainer>
            <AvatarIcon />
          </AvatarContainer>
        )}
        {isParticipantReconnecting && (
          <ReconnectingContainer >
            <Typography>
              Reconnecting...
            </Typography>
          </ReconnectingContainer>
        )}
        {children}
      </InnerContainer>
    </Container>
  )
}
