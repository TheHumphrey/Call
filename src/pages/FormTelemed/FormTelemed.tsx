import { useEffect, useState } from "react"

import {
  Container,
  Title,
  Text,
  SubText,
  ContainerSettings,
  WebCam,
  UsernameInput,
  ContainerInput,
  ButtonJoin,
  ContainerTitle,
  Label,
  DropdownContainer,
  BsBagCheckFillCustom,
  LabelCheck,
} from './style'

import { useParams } from 'react-router-dom'

import { LocalVideoPreview, ToggleAudioButton, ToggleVideoButton } from 'components'

import { AudioInputList } from "components"
import { useChatContext, useVideoContext } from "hooks"
import { useAppState } from "state"

type TPaciente = {
  name: string;
  idade: number;
  planoConvenio: string;
  motivoConsulta: string[];
}

const initalPaciente: TPaciente = {
  name: 'Maria Luisa Machado dos santos',
  idade: 54,
  planoConvenio: 'Bradesco',
  motivoConsulta: ['Dor de garganta', 'Falta de ar']
}


export const FormTelemd = () => {
  const [paciente, setPaciente] = useState<TPaciente>(initalPaciente)
  const { getAudioAndVideoTracks, connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext()
  const { getToken, isFetching } = useAppState()
  const { connect: chatConnect } = useChatContext()
  const [username, setUsername] = useState('')
  const { URLRoomName } = useParams()

  useEffect(() => {
    getAudioAndVideoTracks().catch(error => {
      console.log('Error acquiring local media:')
      console.dir(error)
    })
  }, [getAudioAndVideoTracks])

  const handleJoin = () => {
    if (!URLRoomName) return
    getToken(username, URLRoomName).then(({ access_token }) => {
      videoConnect(access_token)
      chatConnect(access_token)
    })
  }

  const getMotivo = (arr: string[]) => {
    let text = ''
    arr.map(item => text += item + '; ')
    return text
  }

  const onChangeUsername = (event: string) => setUsername(event)

  return (
    <Container>
      <ContainerTitle>
        <Title>{' '}</Title>
        <Text>
          Medico:{' '}
          <SubText>Matheus</SubText>
        </Text>
        <Text>
          Paciente:{' '}
          <SubText>{paciente.name}</SubText>
        </Text>
        <Text>
          Idade:{' '}
          <SubText>{paciente.idade} anos</SubText>
        </Text>
        <Text>
          Plano convênio:{' '}
          <SubText>{paciente.planoConvenio}</SubText>
        </Text>
        <Text>
          Motivo consulta:{' '}
          <SubText>{getMotivo(paciente.motivoConsulta)}</SubText>
        </Text>
      </ContainerTitle>
      <ContainerSettings>
        <WebCam >
          <LocalVideoPreview identity={paciente.name} />
        </WebCam>
        <ContainerInput>
          <Label>
            Como gostaria de ser chamado?
          </Label>
          <UsernameInput onChange={(e) => onChangeUsername(e.target.value)} />

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