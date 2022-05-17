import { useEffect, useState } from 'react'
import { Participant, useSelectedParticipant } from 'components'
import { useParticipants, useVideoContext } from 'hooks'
import { Participant as IParticipant } from 'twilio-video'

import {
  Container,
  ContainerFull,
} from './style'

type TProps = {
  isPrimaryCam?: boolean;
  doctorStyle?: boolean;
}

type TJustOneProps = {
  localParticipant: IParticipant;
  isPrimaryCam: boolean | undefined;
  doctorStyle?: boolean;
}

const JustOneParticipant = ({ localParticipant, isPrimaryCam, doctorStyle }: TJustOneProps) => (
  <>
    {isPrimaryCam ? (
      <ContainerFull>
        <Participant
          participant={localParticipant}
          isPrimaryCam={isPrimaryCam}
          doctorStyle={doctorStyle}
        />
      </ContainerFull>) : null}
  </>
)

export const ParticipantList = (props: TProps) => {
  const { isPrimaryCam, doctorStyle } = props
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

  return isRender ? (
    <JustOneParticipant
      localParticipant={localParticipant}
      isPrimaryCam={isPrimaryCam}
      doctorStyle={doctorStyle}
    />
  ) : isPrimaryCam ? (
    <ContainerFull>
      {participants.map(participant => {
        return (
          <Participant
            key={participant.sid}
            participant={participant}
            isPrimaryCam={isPrimaryCam}
            isSelected={participant === selectedParticipant}
            hideParticipant={!isPrimaryCam}
            doctorStyle={doctorStyle}
          />
        )
      })}
    </ContainerFull>
  ) : (
    <Container>
      <Participant participant={localParticipant} isLocalParticipant={true} withBorder />
    </Container>
  )
}
