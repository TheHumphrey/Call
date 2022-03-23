import { useEffect } from "react"

import {
  Container,
  ContainerSettings,
  WebCam,
  ContainerInput,
  ButtonJoin,
  DropdownContainer,
  BsBagCheckFillCustom,
  LabelCheck,
} from '../FormTelemed/style'

import { useParams } from 'react-router-dom'
import { useAppState } from "state"

import {
  LocalVideoPreview,
  ToggleAudioButton,
  ToggleVideoButton,
  AudioInputList,
  PatientInfo,
} from 'components'

import {
  useChatContext,
  useDoctorContext,
  useVideoContext
} from "hooks"

export const DoctorLobby = () => {
  const { getAudioAndVideoTracks, connect: videoConnect } = useVideoContext()
  // const { getToken, isFetching } = useAppState()
  const { getToken } = useAppState()
  const { connect: chatConnect } = useChatContext()
  const { patient, doctor } = useDoctorContext()
  const { URLRoomName } = useParams()

  const doctorName = doctor?.user?.name

  useEffect(() => {
    localStorage.setItem('URLRoomName', JSON.stringify(URLRoomName))
  }, [URLRoomName])

  useEffect(() => {
    getAudioAndVideoTracks().catch(error => {
      console.log('Error acquiring local media:')
      console.dir(error)
    })
  }, [getAudioAndVideoTracks])

  const handleJoin = () => {
    if (!URLRoomName) return
    getToken(doctorName || 'Doutor', URLRoomName).then(({ access_token }) => {
      videoConnect(access_token)
      chatConnect(access_token)
    })
  }

  return (
    <Container>
      <PatientInfo patientInfos={patient} title=" " doctorName="doctorName" />
      <ContainerSettings>
        <WebCam >
          <LocalVideoPreview identity={doctorName ? `Dr. ${doctorName}` : ' '} />
        </WebCam>
        <ContainerInput>
          <LabelCheck>
            <BsBagCheckFillCustom color="#2395FF" />
            Configra seu áudio e vídeo
          </LabelCheck>

          {/* <DropdownContainer>
            <ToggleVideoButton />
            <TempDropdownCamp />
          </DropdownContainer> */}

          <DropdownContainer>
            <ToggleVideoButton />
            <ToggleAudioButton />
            <AudioInputList />
          </DropdownContainer>

          <ButtonJoin onClick={handleJoin}>Entrar na consulta</ButtonJoin>
        </ContainerInput>
      </ContainerSettings>
    </Container>
  )
}