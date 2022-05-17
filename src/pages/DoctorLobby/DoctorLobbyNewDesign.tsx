import { ChatWindow, DoctorHeader, ParticipantList, ToggleChatButton } from "components"
import { useChatContext, useDoctorContext, useParticipants, useRoomState, useVideoContext } from "hooks"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppState } from "state"

import {
  AudioButton,
  BottomMenu,
  CallButton,
  CallButtonIcon,
  Container,
  DefaultText,
  FormsContainer,
  HeaderContainer,
  JoinRoomContainer,
  JoinTextContainer,
  PatientFormContainer,
  SectionContainer,
  TelephoneFillIcon,
  TitleText,
  VideoButton,
  FomtTitle,
  Label,
  CamContainer,
  TelephoneXFillIcon,
  PrimaryCam,
  SecondaryCam
} from "./style"

export const DoctorLobby = () => {
  const [isConnect, setIsConnect] = useState(false)

  const roomState = useRoomState()
  const participants = useParticipants()
  const { room, connect: videoConnect, getAudioAndVideoTracks } = useVideoContext()
  const { isChatWindowOpen } = useChatContext()
  const { URLRoomName, token } = useParams()
  const { getTokenDoctor } = useAppState()
  const { connect: chatConnect } = useChatContext()
  const { doctor } = useDoctorContext()

  useEffect(() => {
    getAudioAndVideoTracks()
  }, [])

  const history = useNavigate()

  const handleDisconnect = () => {
    room?.disconnect()

    history('/callend', { replace: true })
  }

  const handleConnect = () => {
    setIsConnect(true)
    if (!URLRoomName) return
    if (!token) return
    getTokenDoctor(URLRoomName, doctor?.user?.professionalId, token).then(({ accessToken }) => {
      videoConnect(accessToken)
      chatConnect(accessToken)
    })
  }

  const handleDisconnectOrConnect = () => {
    isConnect ? handleDisconnect() : handleConnect()
  }

  return (
    <Container>
      <HeaderContainer>
        <SectionContainer >
          <DoctorHeader />
          <PatientFormContainer >
            <FomtTitle>
              Questionário
            </FomtTitle>

            <Label withMargin>
              Como gostaria de ser chamado?
            </Label>
            <DefaultText>
              ● Luisa
            </DefaultText>

            <Label withMargin>
              Qual o principal motivo da sua consulta?
            </Label>
            <DefaultText>
              ● Rotina/Check-up
            </DefaultText>

            <Label withMargin>
              Você possui alguma doença auto imune?
            </Label>
            <DefaultText>
              ● Não
            </DefaultText>

            <Label withMargin>
              Possui algum dessas doenças no histórico familiar?
            </Label>
            <DefaultText>
              ● Não
            </DefaultText>

            <Label withMargin>
              Possui atualmente algum desses sintomas?
            </Label>
            <DefaultText>
              ● Dor de cabeça
            </DefaultText>

            <Label withMargin>
              Outra observação que seja importante para a consulta?
            </Label>
            <DefaultText>
              ● Atualmente estou sentindo  muita dor de cabeça.
            </DefaultText>

          </PatientFormContainer>
        </SectionContainer>

        <JoinRoomContainer isChatWindowOpen={isChatWindowOpen}>
          {roomState === 'disconnected' ? (
            <JoinTextContainer>
              <TitleText>Paciente esperando</TitleText>

              <DefaultText withMargin>00:00:00</DefaultText>

              <DefaultText withMargin>
                Clique em
                <CallButtonIcon isText>
                  <TelephoneFillIcon />
                </CallButtonIcon>
                Para iniciar a chamada
              </DefaultText>
            </JoinTextContainer>
          ) : (
            <>
              <CamContainer>
                <PrimaryCam>
                  <ParticipantList isPrimaryCam doctorStyle />
                </PrimaryCam>
              </CamContainer>

              <SecondaryCam isChatWindowOpen={isChatWindowOpen}>
                <ParticipantList doctorStyle />
              </SecondaryCam>
            </>
          )
          }

          <BottomMenu isChatWindowOpen={isChatWindowOpen}>
            <AudioButton fill="white" />
            <VideoButton fill="white" />

            <ToggleChatButton />

            <CallButton onClick={handleDisconnectOrConnect}>
              <CallButtonIcon isRed={isConnect}>
                {isConnect ? <TelephoneXFillIcon /> : <TelephoneFillIcon />}
              </CallButtonIcon>
            </CallButton>
          </BottomMenu>

        </JoinRoomContainer>

      </HeaderContainer>

      <FormsContainer isChatWindowOpen={isChatWindowOpen} />

      <ChatWindow doctorStyle />

    </Container>
  )
}