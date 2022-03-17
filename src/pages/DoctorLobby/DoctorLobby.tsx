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

import { LocalVideoPreview, ToggleAudioButton, ToggleVideoButton } from 'components'

import { AudioInputList, PatientInfo } from "components"
import { useChatContext, useDoctorContext, useVideoContext } from "hooks"
import { useAppState } from "state"

export const DoctorLobby = () => {
  const { getAudioAndVideoTracks, connect: videoConnect } = useVideoContext()
  const { getToken, isFetching } = useAppState()
  const { connect: chatConnect } = useChatContext()
  const { patient } = useDoctorContext()
  const { URLRoomName } = useParams()

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
    getToken(patient?.doctorName || 'Doutor', URLRoomName).then(({ access_token }) => {
      videoConnect(access_token)
      chatConnect(access_token)
    })
  }

  return (
    <Container>
      <PatientInfo patientInfos={patient} title=" " />
      <ContainerSettings>
        <WebCam >
          <LocalVideoPreview identity={patient?.doctorName || ' '} />
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