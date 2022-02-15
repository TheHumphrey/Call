import React from 'react'
import { Participant } from 'twilio-video'
import { useParticipantNetworkQualityLevel } from 'hooks'

import { InnerContainer, OuterContainer, Level } from './style'

const STEP = 3
const BARS_ARRAY = [0, 1, 2, 3, 4]

export const NetworkQualityLevel = ({ participant }: { participant: Participant }) => {
  const networkQualityLevel = useParticipantNetworkQualityLevel(participant)

  if (networkQualityLevel === null) return null

  return (
    <OuterContainer >
      <InnerContainer >
        {BARS_ARRAY.map(level => (
          <Level
            key={level}
            STEP={STEP}
            level={level}
            networkQualityLevel={networkQualityLevel}
          />
        ))}
      </InnerContainer>
    </OuterContainer>
  )
}
