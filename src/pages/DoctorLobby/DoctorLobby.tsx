import { useEffect, useState } from "react"

import {
  Container,
  ContainerSettings,
  WebCam,
  UsernameInput,
  ContainerInput,
  ButtonJoin,
  Label,
  DropdownContainer,
  BsBagCheckFillCustom,
  LabelCheck,
} from '../FormTelemed/style'

import { useParams } from 'react-router-dom'

import { LocalVideoPreview, ToggleAudioButton, ToggleVideoButton } from 'components'

import { AudioInputList, PatientInfo } from "components"
import { useChatContext, useVideoContext } from "hooks"
import { useAppState } from "state"

import { TPaciente } from "types"
// import { patientAPI } from "utils/axios"

const initalPaciente: TPaciente = {
  name: 'Maria Luisa Machado dos santos',
  idade: 54,
  planoConvenio: 'Bradesco',
  motivoConsulta: 'Dor de cabeça, dor de barriga, dores nos braços',
  doctorName: 'Dr. Matheus',
}

export const DoctorLobby = () => {
  const [paciente, setPaciente] = useState<TPaciente>({} as TPaciente)
  const { getAudioAndVideoTracks, connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext()
  const { getToken, isFetching } = useAppState()
  const { connect: chatConnect } = useChatContext()
  const { URLRoomName, token } = useParams()

  useEffect(() => {
    getPatient()
  }, [])

  useEffect(() => {
    localStorage.setItem('patient', JSON.stringify(paciente))
    token && localStorage.setItem('token', token)
  }, [paciente, token])

  useEffect(() => {
    getAudioAndVideoTracks().catch(error => {
      console.log('Error acquiring local media:')
      console.dir(error)
    })
  }, [getAudioAndVideoTracks])

  const getPatient = () => {
    setPaciente(initalPaciente)
    // patientAPI.post<TPaciente>('/patientset', paciente).then(({ data }) => localStorage.setItem('patient', JSON.stringify(data)))
  }

  const handleJoin = () => {
    if (!URLRoomName) return
    getToken(paciente?.doctorName || 'Doutor', URLRoomName).then(({ access_token }) => {
      videoConnect(access_token)
      chatConnect(access_token)
    })
  }

  return (
    <Container>
      <PatientInfo patientInfos={paciente} title=" " />
      <ContainerSettings>
        <WebCam >
          <LocalVideoPreview identity={paciente?.doctorName || ' '} />
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