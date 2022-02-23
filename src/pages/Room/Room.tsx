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
  SideMenu,
  // BottomButton,
  CallButton,
  CallButtonIcon,
  // SecundaryMenu,
  // ConectionMenu,
  AudioButton,
  VideoButton,
  // CamParticipant,
  FileIcon,
  ClipIcon,
  BottleIcon,
} from './style'

import { Modal } from "@material-ui/core"

import {
  BsTelephoneXFill,
} from "react-icons/bs"


import { ChatWindow, ParticipantList } from 'components'

import { useNavigate } from "react-router-dom"
import { ToggleChatButton } from "components/ToggleChatButton/ToggleChatButton"
import { useChatContext, useVideoContext } from "hooks"

export const Room = () => {
  // const [pacienteVideo, setPacienteVideo] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [currentTime, setCurrentTime] = useState('00:00')

  const history = useNavigate()

  const { room } = useVideoContext()
  const { isChatWindowOpen } = useChatContext()

  const handleDisconnect = () => {
    room?.disconnect()

    history('/', { replace: true })

  }

  const teste = () => {
    document.documentElement.requestFullscreen()
  }

  return (
    <Container>
      <PrimaryCam>
        <ParticipantList isPrimaryCam />
      </PrimaryCam>
      <TopMenu >
        <LabelMenu onClick={teste} >Consulta Telemedicina</LabelMenu>
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

        <CallButton onClick={handleDisconnect}>
          <CallButtonIcon>
            <BsTelephoneXFill />
          </CallButtonIcon>
        </CallButton>

      </BottomMenu>

      <SideMenu isChatWindowOpen={isChatWindowOpen}>

        <CallButton>
          <ClipIcon />
        </CallButton>

        <CallButton>
          <FileIcon />
        </CallButton>

        <CallButton>
          <BottleIcon />
        </CallButton>
      </SideMenu>

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

      <Modal
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <span></span>
      </Modal>

    </Container>
  )
}