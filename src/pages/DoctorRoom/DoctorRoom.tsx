/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

import {
  Container,
  LabelMenu,
  PrimaryCam,
  TopMenu,
  TimerMenu,
  BottomMenu,
  SecondaryCam,
  SideMenu,
  CallButton,
  CallButtonIcon,
  AudioButton,
  VideoButton,
  FileIcon,
  BottleIcon,
  FullButtonIcon,
  ModalCustom,
  ModalBox,
  XIcon,
  CamContainer,
  BsTelephoneXFillCustom,
  BsArrowsFullscreenCustom,
  BsFullscreenExitCustom
} from './style'


import {
  ChatWindow,
  ParticipantList,
  ClinicRegisterWrapper,
  FormTypeButtons,
  DocViewer,
  PatientInfo,
} from 'components'

import { useNavigate } from "react-router-dom"
import { ToggleChatButton } from "components/ToggleChatButton/ToggleChatButton"
import { useChatContext, useVideoContext, useParticipants, useDoctorContext } from "hooks"
import { TPatient } from "types"

export const DoctorRoom = () => {
  // const [pacienteVideo, setPacienteVideo] = useState()
  const [openModalClinicalRecord, setOpenModalClinicalRecord] = useState(false)
  const [openModalRecipe, setOpenModalRecipe] = useState(false)
  const [screen, setScreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isAwaitDoctor, setIsAwaitDoctor] = useState(true)

  // const [selectedType, setSelectedType] = useState({ value: [] });

  const {
    patient,
    setPatient,
    datas,
    changeEditorState,
    selectedDocumentTemplate,
    setSelectedDocumentTemplate,
    templatesOptions,
    setTypeDocumentSelected,
    getDocumentsAfterSave,
    getModelsByType,
    handleSave,
  } = useDoctorContext()

  const participants = useParticipants()


  useEffect(() => {
    const newPatient: TPatient | null = JSON.parse(localStorage.getItem('patient') || '')

    newPatient && setPatient({ ...patient, ...newPatient })
  }, [])

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
      <PatientInfo patientInfos={patient} modalStyle title=" " />
      <CamContainer>
        <PrimaryCam>
          <ParticipantList isPrimaryCam doctorStyle />
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
              <BsTelephoneXFillCustom />
            </CallButtonIcon>
          </CallButton>

          <CallButton onClick={handleFullscreen}>
            <FullButtonIcon>
              {screen ? (<BsFullscreenExitCustom />) : (<BsArrowsFullscreenCustom />)}
            </FullButtonIcon>
          </CallButton>

        </BottomMenu>
        <SideMenu isChatWindowOpen={isChatWindowOpen}>
          <CallButton onClick={() => setOpenModalClinicalRecord(true)}>
            <FileIcon />
          </CallButton>

          <CallButton>
            <BottleIcon onClick={() => setOpenModalRecipe(true)} />
          </CallButton>
        </SideMenu>

        <SecondaryCam isChatWindowOpen={isChatWindowOpen}>
          <ParticipantList />

        </SecondaryCam>
      </CamContainer>

      <ChatWindow doctorStyle />

      <ModalCustom
        open={openModalClinicalRecord}
        onClose={() => setOpenModalClinicalRecord(!openModalClinicalRecord)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <XIcon onClick={() => setOpenModalClinicalRecord(false)} />
          <ClinicRegisterWrapper datas={datas} getDocumentsAfterSave={getDocumentsAfterSave} />
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
          <FormTypeButtons getModelsByType={getModelsByType} setTypeDocumentSelected={setTypeDocumentSelected} />

          <DocViewer
            templatesOptions={templatesOptions}
            selectedDocumentTemplate={selectedDocumentTemplate}
            setSelectedDocumentTemplate={setSelectedDocumentTemplate}
            changeEditorState={changeEditorState}
            handleSave={handleSave}
          />
        </ModalBox>
      </ModalCustom>

    </Container>
  )
}