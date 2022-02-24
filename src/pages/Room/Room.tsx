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
  FullButtonIcon,
} from './style'

import { Modal } from "@material-ui/core"

import {
  BsTelephoneXFill,
  BsArrowsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs"


import { ChatWindow, ParticipantList } from 'components'

import { useNavigate } from "react-router-dom"
import { ToggleChatButton } from "components/ToggleChatButton/ToggleChatButton"
import { useChatContext, useVideoContext } from "hooks"

export const Room = () => {
  // const [pacienteVideo, setPacienteVideo] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [screen, setScreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isTimeCount, setIsTimeCount] = useState(true)

  useEffect(() => {
    if (isTimeCount) {
      setTimeout(() => {
        setCurrentTime(state => state + 1)
      }, 1000)
    }
  }, [currentTime])

  const hours = Math.floor(currentTime / 60 / 60)
  const minutes = Math.floor(currentTime / 60)
  const seconds = currentTime % 60

  const history = useNavigate()

  const { room } = useVideoContext()
  const { isChatWindowOpen } = useChatContext()

  const handleDisconnect = () => {
    room?.disconnect()
    setIsTimeCount(false)

    history('/', { replace: true })
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

        <CallButton onClick={handleFullscreen}>
          <FullButtonIcon>
            {screen ? (<BsFullscreenExit />) : (<BsArrowsFullscreen />)}
          </FullButtonIcon>
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