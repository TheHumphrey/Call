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

import { TAttendance, TPatient } from "types"
import { attendanceApi, clinicApi } from "utils/axios"

export const DoctorLobby = () => {
  const [paciente, setPaciente] = useState<TPatient>({} as TPatient)
  const { getAudioAndVideoTracks, connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext()
  const { getToken, isFetching } = useAppState()
  const { connect: chatConnect } = useChatContext()
  const { URLRoomName, token, patientId } = useParams()

  useEffect(() => {
    getPatient()
    getAttendance()
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

  const getPatient = async () => {
    if (!token || !patientId) return

    const clinicService = clinicApi(token)
    await clinicService
      .get<TPatient[]>(`/patients`).then(
        ({ data }) => {
          const patient = data.find(item => item.id === patientId)
          localStorage.setItem('patient', JSON.stringify(patient || ''))
          if (!patient) return
          setPaciente(patient)
        }
      )
  }

  const getAttendance = async () => {
    if (!token || !patientId) return
    const dateTime = new Date()
    const today = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)}-${dateTime.getDate()}`

    const attendanceService = attendanceApi(token)
    await attendanceService
      .get<TAttendance[]>(`/attendances?readyAt=true&createdAt=${today}`).then(
        ({ data }) => {
          const attendance = data.find(item => item.patientId === patientId)
          localStorage.setItem('attendance', JSON.stringify(attendance || ''))
        }
      )
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