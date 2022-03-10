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
  ModalCustom,
  ModalBox,
  XIcon,
} from './style'

import {
  BsTelephoneXFill,
  BsArrowsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs"


import { ChatWindow, ParticipantList, ClinicRegisterWrapper, FormTypeButtons } from 'components'

import { useNavigate } from "react-router-dom"
import { ToggleChatButton } from "components/ToggleChatButton/ToggleChatButton"
import { useChatContext, useVideoContext, useParticipants } from "hooks"
import { TDataProntuario } from "types"
import { documentApi } from "lib/api/document"

export const Room = () => {
  // const [pacienteVideo, setPacienteVideo] = useState()
  const [openModalClinicalRecord, setOpenModalClinicalRecord] = useState(false)
  const [openModalRecipe, setOpenModalRecipe] = useState(false)
  const [screen, setScreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isAwaitDoctor, setIsAwaitDoctor] = useState(true)
  const [datas, setDatas] = useState<any>()

  const participants = useParticipants()

  const token = 'teste'
  const documentService = documentApi(token)

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

    history('/', { replace: true })
  }

  const handleFullscreen = () => {
    screen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    setScreen(!screen)
  }

  const getDocumentsAfterSave = async () => {
    const documents = await documentService.get(`/documents?patient=${datas.patient.id}`);

    setDatas((prev: any) => ({ ...prev, documents: documents.data.reverse() }));
  }

  return isAwaitDoctor ? (
    <>
      <h1>Esperando Doctor</h1>
    </>
  ) : (
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

        <CallButton onClick={() => setOpenModalClinicalRecord(true)}>
          <ClipIcon />
        </CallButton>

        <CallButton>
          <FileIcon onClick={() => setOpenModalRecipe(true)} />
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

      <ModalCustom
        open={openModalClinicalRecord}
        onClose={() => setOpenModalClinicalRecord(!openModalClinicalRecord)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <XIcon onClick={() => setOpenModalClinicalRecord(false)} />
          <ClinicRegisterWrapper datas={{} as TDataProntuario} getDocumentsAfterSave={() => { }} token="aa" />
        </ModalBox>
      </ModalCustom>

      <ModalCustom
        open={openModalRecipe}
        onClose={() => setOpenModalRecipe(!openModalRecipe)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <XIcon onClick={() => setOpenModalRecipe(false)} />
          <FormTypeButtons getModelsByType={null} setTypeDocumentSelected={null} />
        </ModalBox>
      </ModalCustom>
    </Container>
  )
}