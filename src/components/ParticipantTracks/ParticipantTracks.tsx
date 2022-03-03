import { Participant, Track } from 'twilio-video'

import { Publication } from 'components'

import { usePublications } from 'hooks'

interface ParticipantTracksProps {
  participant: Participant;
  videoOnly?: boolean;
  videoPriority?: Track.Priority | null;
  isLocalParticipant?: boolean;
}

export const ParticipantTracks = ({
  participant,
  videoOnly,
  videoPriority,
  isLocalParticipant,
}: ParticipantTracksProps) => {
  const publications = usePublications(participant)

  let filteredPublications = publications.filter(p => !p.trackName.includes('screen'))

  return (
    <>
      {filteredPublications.map(publication => (
        <Publication
          key={publication.kind}
          publication={publication}
          participant={participant}
          isLocalParticipant={isLocalParticipant}
          videoOnly={videoOnly}
          videoPriority={videoPriority}
        />
      ))}
    </>
  )
}
