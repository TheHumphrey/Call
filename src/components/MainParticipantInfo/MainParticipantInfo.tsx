import React from 'react'
import { LocalAudioTrack, Participant, RemoteAudioTrack } from 'twilio-video'

import { NetworkQualityLevel } from 'components'

import Tooltip from '@material-ui/core/Tooltip'

import { useIsRecording, useParticipantIsReconnecting, usePublications, useTrack, useVideoContext } from 'hooks'
import AudioLevelIndicator from 'components/AudioLevelIndicator/AudioLevelIndicator'

import {
  Circle,
  Container,
  Identity,
  InfoContainer,
  ReconnectingContainer,
  RecordingIndicator,
  Typography
} from './style'

interface MainParticipantInfoProps {
  participant: Participant;
  children: React.ReactNode;
}

export const MainParticipantInfo = ({ participant, children }: MainParticipantInfoProps) => {
  const publications = usePublications(participant)

  const audioPublication = publications.find(p => p.kind === 'audio')
  const audioTrack = useTrack(audioPublication) as LocalAudioTrack | RemoteAudioTrack | undefined;

  const isParticipantReconnecting = useParticipantIsReconnecting(participant);

  const isRecording = useIsRecording()

  return (
    <Container
      data-cy-main-participant
      data-cy-participant={participant.identity}
    >
      <InfoContainer >
        <div style={{ display: 'flex' }}>
          <Identity >
            <AudioLevelIndicator audioTrack={audioTrack} />
            <Typography>
              {participant.identity}
            </Typography>
          </Identity>
          <NetworkQualityLevel participant={participant} />
        </div>
        {isRecording && (
          <Tooltip
            title="All participants' audio and video is currently being recorded. Visit the app settings to stop recording."
            placement="top"
          >
            <RecordingIndicator >
              <Circle ></Circle>
              <Typography data-cy-recording-indicator>
                Recording
              </Typography>
            </RecordingIndicator>
          </Tooltip>
        )}
      </InfoContainer>
      {isParticipantReconnecting && (
        <ReconnectingContainer >
          <Typography style={{ color: 'white' }}>
            Reconnecting...
          </Typography>
        </ReconnectingContainer>
      )}
      {children}
    </Container>
  )
}
