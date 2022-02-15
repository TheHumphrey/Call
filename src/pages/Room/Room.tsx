import { useState } from "react"

import {
  Container,
  LabelMenu,
  PrimaryCam,
  TopMenu,
  TimerMenu,
  ResolutionMenu,
  BottomMenu,
  SecondaryCam,
  BottomButton,
  CallButton,
  CallButtonIcon,
  SecundaryMenu,
  ConectionMenu,
  AudioButton,
  VideoButton,
  CamParticipant,
} from './style'

import {
  BsThreeDots,
  BsTelephoneXFill,
  BsThreeDotsVertical,
  BsReception4,
} from "react-icons/bs"

import { ChatWindow, ParticipantList } from 'components'

import { Link } from "react-router-dom"
import { ToggleChatButton } from "components/ToggleChatButton/ToggleChatButton"
import { useChatContext } from "hooks"

export const Room = () => {
  const [pacienteVideo, setPacienteVideo] = useState()
  const [currentTime, setCurrentTime] = useState('00:00')
  const { isChatWindowOpen } = useChatContext()

  return (
    <Container>
      <PrimaryCam>
        <ParticipantList isPrimaryCam />
      </PrimaryCam>
      <TopMenu >
        <LabelMenu >Consulta Telemedicina</LabelMenu>
        <TimerMenu>{currentTime}</TimerMenu>
        <ResolutionMenu>HD</ResolutionMenu>
      </TopMenu>

      <BottomMenu>
        <AudioButton fill="white" />
        <VideoButton fill="white" />

        {/* <BottomButton>
          <BsThreeDots />
        </BottomButton> */}

        <ToggleChatButton />

        <Link to="/">
          <CallButton>
            <CallButtonIcon>
              <BsTelephoneXFill />
            </CallButtonIcon>
          </CallButton>
        </Link>

      </BottomMenu>



      <SecondaryCam isChatWindowOpen={isChatWindowOpen}>
        <ParticipantList />
        {/* <ConectionMenu>
          <BsReception4 />
        </ConectionMenu>
        <SecundaryMenu>
          <BsThreeDotsVertical />
        </SecundaryMenu> */}

      </SecondaryCam>

      <ChatWindow />

    </Container>
  )
}