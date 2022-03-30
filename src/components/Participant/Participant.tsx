import React from 'react'
import { ParticipantInfo, ParticipantTracks } from 'components'
import { Participant as IParticipant } from 'twilio-video'

interface ParticipantProps {
  participant: IParticipant;
  videoOnly?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  isPrimaryCam?: boolean;
  isLocalParticipant?: boolean;
  hideParticipant?: boolean;
  doctorStyle?: boolean;
}

export const Participant = ({
  participant,
  videoOnly,
  onClick,
  isSelected,
  isLocalParticipant,
  isPrimaryCam,
  hideParticipant,
  doctorStyle,
}: ParticipantProps) => {
  return (
    <ParticipantInfo
      participant={participant}
      onClick={onClick}
      isSelected={isSelected}
      isPrimaryCam={isPrimaryCam}
      isLocalParticipant={isLocalParticipant}
      hideParticipant={hideParticipant}
      doctorStyle={doctorStyle}
    >
      <ParticipantTracks
        participant={participant}
        videoOnly={videoOnly}
        isLocalParticipant={isLocalParticipant}
      />
    </ParticipantInfo>
  )
}
