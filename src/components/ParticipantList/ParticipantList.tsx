import { useEffect, useState } from 'react'
import { Participant, useSelectedParticipant } from 'components'
import { useParticipants, useVideoContext } from 'hooks'

import {
  Container,
  ContainerFull,
} from './style'

type TProps = {
  isPrimaryCam?: boolean;
}

export const ParticipantList = (props: TProps) => {
  const { isPrimaryCam } = props
  const { room } = useVideoContext()
  const localParticipant = room!.localParticipant
  const participants = useParticipants()
  const [selectedParticipant] = useSelectedParticipant()
  const [isRender, setIsRender] = useState(false)

  useEffect(
    () => {
      setIsRender(participants.length === 0)
    }, [participants]
  )

  return isRender ? null : isPrimaryCam ? (
    <ContainerFull>
      {participants.map(participant => {
        return (
          <Participant
            key={participant.sid}
            participant={participant}
            isPrimaryCam={isPrimaryCam}
            isSelected={participant === selectedParticipant}
            hideParticipant={!isPrimaryCam}
          />
        )
      })}
    </ContainerFull>
  ) : (
    <Container>
      <Participant participant={localParticipant} isLocalParticipant={true} />
    </Container>
  )
}
