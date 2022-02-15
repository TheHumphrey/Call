import { useEffect, useState } from 'react'
import { useVideoContext } from 'hooks'
import { RemoteParticipant } from 'twilio-video'

export const useDominantSpeaker = () => {
  const { room } = useVideoContext()
  const [dominantSpeaker, setDominantSpeaker] = useState(room?.dominantSpeaker ?? null)

  useEffect(() => {
    if (room) {
      const handleDominantSpeakerChanged = (newDominantSpeaker: RemoteParticipant) => {
        if (newDominantSpeaker !== null) {
          setDominantSpeaker(newDominantSpeaker)
        }
      }

      const handleParticipantDisconnected = (participant: RemoteParticipant) => {
        setDominantSpeaker(prevDominantSpeaker => {
          return prevDominantSpeaker === participant ? null : prevDominantSpeaker
        })
      }

      room.on('dominantSpeakerChanged', handleDominantSpeakerChanged)
      room.on('participantDisconnected', handleParticipantDisconnected)
      return () => {
        room.off('dominantSpeakerChanged', handleDominantSpeakerChanged)
        room.off('participantDisconnected', handleParticipantDisconnected)
      }
    }
  }, [room])

  return dominantSpeaker
}
