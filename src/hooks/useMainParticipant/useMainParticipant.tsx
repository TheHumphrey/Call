import { useVideoContext, useDominantSpeaker, useParticipants } from 'hooks'

import useSelectedParticipant from 'components/VideoProvider/useSelectedParticipant/useSelectedParticipant'

export const useMainParticipant = () => {
  const [selectedParticipant] = useSelectedParticipant()
  const dominantSpeaker = useDominantSpeaker()
  const participants = useParticipants()
  const { room } = useVideoContext()
  const localParticipant = room?.localParticipant

  return selectedParticipant || dominantSpeaker || participants[0] || localParticipant;
}
