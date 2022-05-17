
import { CircularProgress } from "@material-ui/core"
import { AudioInputList, LocalVideoPreview, PatientHeader, ToggleAudioButton, ToggleVideoButton } from "components"
import { useChatContext, usePatientContext, useVideoContext } from "hooks"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppState } from "state"

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
  AwaitDiv,
  LabelAwait,
} from "./style"

export const PatientLobby = () => {
  const [isAwaitDoctor, setIsAwaitDoctor] = useState(false)

  const { username } = usePatientContext()
  const { connect: chatConnect } = useChatContext()
  const { connect: videoConnect, getAudioAndVideoTracks } = useVideoContext()

  const { getToken } = useAppState()

  const { URLRoomName, tenant } = useParams()

  useEffect(() => {
    getAudioAndVideoTracks().catch(error => {
      console.log('Error acquiring local media:')
      console.dir(error)
    })
  }, [getAudioAndVideoTracks])

  const handleJoin = () => {
    if (!URLRoomName) return
    if (!tenant) return
    setIsAwaitDoctor(true)
    getToken(tenant, URLRoomName).then(({ accessToken }) => {
      videoConnect(accessToken)
      chatConnect(accessToken)
    }).catch(() => { })
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
            <LocalVideoPreview identity={username || 'nome não encontrado.'} />
          </WebCam>

          <ContainerInput>
            {
              isAwaitDoctor ? (
                <AwaitDiv>
                  <CircularProgress size={60} color="primary" />
                  <LabelAwait>
                    Esperando médico(a) iniciar a consulta
                  </LabelAwait>
                </AwaitDiv>
              ) : (
                <>
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
                </>
              )
            }
          </ContainerInput>
        </ConfigContainer>

      </SectionContainer>

    </Container>
  )
}