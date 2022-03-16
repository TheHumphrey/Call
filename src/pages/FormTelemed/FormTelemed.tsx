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
} from './style'

import { useParams } from 'react-router-dom'

import {
  LocalVideoPreview,
  ToggleAudioButton,
  ToggleVideoButton,
  AudioInputList,
  PatientInfo
} from 'components'

import { useChatContext, useVideoContext } from "hooks"
import { useAppState } from "state"
import { TPaciente } from "types"
import { patientAPI } from "utils/axios"

const initalPaciente: TPaciente = {
  name: 'Maria Luisa Machado dos santos',
  idade: 54,
  planoConvenio: 'Bradesco',
  doctorName: 'Dr. Matheus',
}


export const FormTelemd = () => {
  const [paciente, setPaciente] = useState<TPaciente>({} as TPaciente)
  const { getAudioAndVideoTracks, connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext()
  const { getToken, isFetching } = useAppState()
  const { connect: chatConnect } = useChatContext()
  const [username, setUsername] = useState('')
  const { URLRoomName } = useParams()

  useEffect(() => {
    getPatient()
  }, [])

  useEffect(() => {
    getAudioAndVideoTracks().catch(error => {
      console.log('Error acquiring local media:')
      console.dir(error)
    })
  }, [getAudioAndVideoTracks])

  useEffect(() => {
    localStorage.setItem('patient', JSON.stringify(paciente))
  }, [paciente])

  const getPatient = () => {
    setPaciente(initalPaciente)
  }

  const handleJoin = () => {
    if (!URLRoomName) return
    getToken(username, URLRoomName).then(({ access_token }) => {
      videoConnect(access_token)
      chatConnect(access_token)
    })
    updatePatientInfo()
  }

  const updatePatientInfo = async () => {
    patientAPI.post<TPaciente>('/patientset', paciente).then()
  }

  const onChangeUsername = (value: string) => setUsername(value)

  const onChangeMotivoConsulta = (value: string) => setPaciente({ ...paciente, motivoConsulta: value })

  return (
    <Container>
      <PatientInfo patientInfos={paciente} title=" " />
      <ContainerSettings>
        <WebCam >
          <LocalVideoPreview identity={paciente.name} />
        </WebCam>
        <ContainerInput>
          <Label>
            Como gostaria de ser chamado?
          </Label>
          <UsernameInput onChange={(e) => onChangeUsername(e.target.value)} />

          <Label withMargin>
            Motivo da consulta? (ex: Dor de cabeça, Náusea)
          </Label>
          <UsernameInput onChange={(e) => onChangeMotivoConsulta(e.target.value)} />

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