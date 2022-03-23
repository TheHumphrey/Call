import React, { useEffect, useState } from 'react'

import { ParticipantTracks, MainParticipantInfo } from 'components'

import { useMainParticipant, useVideoContext } from 'hooks'
import useSelectedParticipant from 'components/VideoProvider/useSelectedParticipant/useSelectedParticipant'
import { LocalVideoTrack } from 'twilio-video'
import AvatarIcon from 'icons/AvatarIcon'

import styled from 'styled-components'

export const AvatarContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`

type TVideoPriority = 'high' | null


export const MainParticipant = () => {
  const mainParticipant = useMainParticipant()
  const { room, localTracks } = useVideoContext()
  const localParticipant = room!.localParticipant
  const [selectedParticipant] = useSelectedParticipant()
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>()
  const [videoPriority, setVideoPriority] = useState<TVideoPriority>(null)

  useEffect(() => {
    setVideoTrack(localTracks.find(
      track => !track.name.includes('screen') && track.kind === 'video'
    ) as LocalVideoTrack)

    setVideoPriority((mainParticipant === selectedParticipant) && mainParticipant !== localParticipant ? 'high' : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTracks])

  return (
    <MainParticipantInfo participant={mainParticipant}>
      {videoTrack ? (
        <ParticipantTracks
          participant={mainParticipant}
          videoOnly
          videoPriority={videoPriority}
          isLocalParticipant={mainParticipant === localParticipant}
        />
      ) : (
        <AvatarContainer>
          <AvatarIcon />
        </AvatarContainer>
      )}

    </MainParticipantInfo>
  )
}
