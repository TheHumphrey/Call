import { usePatientContext, useVideoContext } from 'hooks'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Container,
  LogoContainer,
  Title,
  Text,
  ButtonNext
} from "./style"

export const StartPage = () => {
  const { setTenant } = usePatientContext()
  const history = useNavigate()
  const { URLRoomName, tenant } = useParams()

  const { getAudioAndVideoTracks } = useVideoContext()

  useEffect(() => {
    getAudioAndVideoTracks().catch(error => {
      console.log('Error acquiring local media:')
      console.dir(error)
    })
  }, [getAudioAndVideoTracks])

  const handleClick = () => {
    history(`../form/${tenant}/${URLRoomName}`, { replace: true })
  }

  useEffect(() => {
    if (!tenant) return
    setTenant(tenant)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenant])

  return (
    <Container>
      <LogoContainer />
      <Title>Bem vindo(a) ao "o que o cliente quiser"!</Title>
      <Text>
        para iniciarmos o atendimento e melhor atende-lo(a), precisamos que
        responda um pequeno questionario
      </Text>
      <ButtonNext onClick={handleClick}>
        Iniciar questionário
      </ButtonNext>
    </Container>
  )
}