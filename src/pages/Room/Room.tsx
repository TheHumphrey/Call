/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

import {
  Container,
  LabelMenu,
  PrimaryCam,
  TopMenu,
  TimerMenu,
  ResolutionMenu,
  BottomMenu,
  SecondaryCam,
  // BottomButton,
  CallButton,
  CallButtonIcon,
  // SecundaryMenu,
  // ConectionMenu,
  AudioButton,
  VideoButton,
  // CamParticipant,
  FullButtonIcon,
} from './style'

import {
  BsTelephoneXFill,
  BsArrowsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs"


import {
  ChatWindow,
  ParticipantList,
} from 'components'

import { useNavigate } from "react-router-dom"
import { ToggleChatButton } from "components/ToggleChatButton/ToggleChatButton"
import { useChatContext, useVideoContext, useParticipants } from "hooks"

export const Room = () => {
  // const [pacienteVideo, setPacienteVideo] = useState()
  const [screen, setScreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isAwaitDoctor, setIsAwaitDoctor] = useState(true)

  // const [selectedType, setSelectedType] = useState({ value: [] });

  const participants = useParticipants()

  useEffect(() => {
    if (!isAwaitDoctor) {
      setTimeout(() => {
        setCurrentTime(state => state + 1)
      }, 1000)
    }
  }, [isAwaitDoctor, currentTime])

  useEffect(
    () => {
      setIsAwaitDoctor(participants.length === 0)
    }, [participants]
  )

  const hours = Math.floor(currentTime / 60 / 60)
  const minutes = Math.floor(currentTime / 60)
  const seconds = currentTime % 60

  const history = useNavigate()

  const { room } = useVideoContext()
  const { isChatWindowOpen } = useChatContext()

  const handleDisconnect = () => {
    room?.disconnect()
    setIsAwaitDoctor(false)

    history('/callend', { replace: true })
  }

  const handleFullscreen = () => {
    screen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    setScreen(!screen)
  }

  return (
    <Container>
      <PrimaryCam>
        <ParticipantList isPrimaryCam />
      </PrimaryCam>
      <TopMenu >
        <LabelMenu>Consulta Telemedicina</LabelMenu>
        <TimerMenu>
          {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </TimerMenu>
      </TopMenu>

      <BottomMenu>
        <AudioButton fill="white" />
        <VideoButton fill="white" />

        <ToggleChatButton />

        <CallButton onClick={handleDisconnect}>
          <CallButtonIcon>
            <BsTelephoneXFill />
          </CallButtonIcon>
        </CallButton>

        <CallButton onClick={handleFullscreen}>
          <FullButtonIcon>
            {screen ? (<BsFullscreenExit />) : (<BsArrowsFullscreen />)}
          </FullButtonIcon>
        </CallButton>

      </BottomMenu>

      <SecondaryCam isChatWindowOpen={isChatWindowOpen}>
        <ParticipantList />

      </SecondaryCam>

      <ChatWindow />
    </Container>
  )
}