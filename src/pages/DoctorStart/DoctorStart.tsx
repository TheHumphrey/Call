
import { AudioInputList, LocalVideoPreview, PatientHeader, ToggleAudioButton, ToggleVideoButton } from "components"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  DropdownContainer,
  ConfigContainer,
  Container,
  WebCam,
  LobbyTitle,
  SectionContainer,
  LabelCheck,
  BsBagCheckFillCustom,
  ContainerInput,
  ButtonContainer,
  ButtonNext,
} from "pages/PatientLobby/style"

import { useDoctorContext, useVideoContext } from "hooks"


export const DoctorStart = () => {
  const history = useNavigate()
  const { doctor } = useDoctorContext()
  const { URLRoomName, token, tenant } = useParams()

  const doctorName = doctor?.user?.name

  const { getAudioAndVideoTracks } = useVideoContext()

  useEffect(() => {
    getAudioAndVideoTracks().catch(error => {
      console.log('Error acquiring local media:')
      console.dir(error)
    })
  }, [getAudioAndVideoTracks])

  const handleJoin = () => {
    history(`../doctor-lobby/${tenant}/${URLRoomName}/${token}`, { replace: true })
  }

  return (
    <Container>

      <PatientHeader />

      <SectionContainer>

        <LobbyTitle>
          Configurações de chamada
        </LobbyTitle>

        <ConfigContainer>
          <WebCam >
            <LocalVideoPreview identity={doctorName || 'nome não encontrado.'} />
          </WebCam>

          <ContainerInput>

            <LabelCheck>
              <BsBagCheckFillCustom color="#2395FF" />
              Configure seu áudio e vídeo
            </LabelCheck>

            <DropdownContainer>
              <ToggleVideoButton />
              <ToggleAudioButton />
              <AudioInputList />
            </DropdownContainer>

            <ButtonContainer>
              <ButtonNext onClick={handleJoin}>
                Entrar na consulta
              </ButtonNext>
            </ButtonContainer>
          </ContainerInput>
        </ConfigContainer>

      </SectionContainer>

    </Container>
  )
}