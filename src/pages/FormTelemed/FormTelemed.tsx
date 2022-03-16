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
import { TPatient } from "types"
// import { patientAPI } from "utils/axios"

const initialPacient = {
  fullname: '',
  birthdate: '',
  doctorName: '',
}


export const FormTelemd = () => {
  const [paciente, setPaciente] = useState<TPatient>(initialPacient as TPatient)
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
    setPaciente(
      {
        ...paciente,
        fullname: 'Maria Luisa Machado dos santos',
        birthdate: '15/02/1998',
        doctorName: 'Dr. Matheus'
      }
    )
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
    // patientAPI.post<TPaciente>('/patientset', paciente).then()
  }

  const onChangeUsername = (value: string) => setUsername(value)

  const onChangeMotivoConsulta = (value: string) => setPaciente({ ...paciente, reason: value })

  return (
    <Container>
      <PatientInfo patientInfos={paciente} title=" " />
      <ContainerSettings>
        <WebCam >
          <LocalVideoPreview identity={paciente.fullname || 'nome não encontrado.'} />
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