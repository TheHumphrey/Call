
import { CheckBox, PatientHeader } from "components"
import { usePatientContext } from "hooks"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  FormContainer,
  Container,
  FomtTitle,
  Label,
  UsernameInput,
  ReasonCheckBoxContainer,
  AutoCheckBoxContainer,
  TextArea,
  TextAreaContainer,
  ButtonNext,
  ButtonContainer,
  SintomaCheckBoxContainer,
} from "./style"

export const PatientForm = () => {
  const { username, onChangeUsername, setTenant } = usePatientContext()

  const history = useNavigate()
  const { URLRoomName, tenant } = useParams()

  const handleClick = () => {
    history(`../lobby/${tenant}/${URLRoomName}`, { replace: true })
  }

  useEffect(() => {
    if (!tenant) return
    setTenant(tenant)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenant])

  return (
    <Container>
      <PatientHeader />

      <FormContainer>
        <FomtTitle>
          Questionário
        </FomtTitle>

        <Label withMargin>
          Como gostaria de ser chamado?
        </Label>
        <UsernameInput value={username} onChange={(e) => onChangeUsername(e.target.value)} />

        <Label withMargin>
          Qual o principal motivo da sua consulta?
        </Label >
        <ReasonCheckBoxContainer>
          <CheckBox label="Rotina/Check-up" />
          <CheckBox label="Sintomas" />
          <CheckBox label="Trabalhista" />
          <CheckBox label="Outro" />
        </ReasonCheckBoxContainer>

        <Label withMargin>
          Você possui alguma doença auto imune?
        </Label>
        <AutoCheckBoxContainer>
          <CheckBox label="Diabetes" />
          <CheckBox label="Lúpus" />
          <CheckBox label="Artrite reumatoide" />
          <CheckBox label="Esclerose múltipla" />
          <CheckBox label="Vitiligo" />
          <CheckBox label="Doença na tireoide" />
          <CheckBox label="Anemia" />
          <CheckBox label="Outra" />
        </AutoCheckBoxContainer>

        <Label withMargin>
          Possui algum dessas doenças no histórico familiar?
        </Label>
        <AutoCheckBoxContainer>
          <CheckBox label="Diabetes na família" />
          <CheckBox label="Câncer" />
          <CheckBox label="Depressão" />
          <CheckBox label="Doenças cardíacas" />
          <CheckBox label="Pressão alta" />
          <CheckBox label="Outra" />
        </AutoCheckBoxContainer>

        <Label withMargin>
          Possui atualmente algum desses sintomas?
        </Label>
        <SintomaCheckBoxContainer>
          <CheckBox label="Dor de cabeça" />
          <CheckBox label="Dor de garganta" />
          <CheckBox label="Febre" />
          <CheckBox label="Dores no corpo" />
          <CheckBox label="Diarreia ou vomito" />
          <CheckBox label="Fraqueza" />
          <CheckBox label="Falta de ar" />
          <CheckBox label="Anemia" />
          <CheckBox label="Outro" />
        </SintomaCheckBoxContainer>

        <Label withMargin>
          Gostaria de fazer alguma outra observação que seja importante para a consulta?
        </Label>
        <TextAreaContainer>
          <TextArea />
        </TextAreaContainer>

        <ButtonContainer>
          <ButtonNext onClick={handleClick}>
            Enviar
          </ButtonNext>
        </ButtonContainer>

      </FormContainer>
    </Container>
  )
}