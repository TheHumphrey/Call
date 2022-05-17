import {
  DefaultLogo,
  HeaderContainer,
  PatientContainer,
  ProfessionalContainer,
  PatientDoctorContainer,
  BoldText,
  Text,
} from "./style"

export const PatientHeader = () => {
  return (
    <HeaderContainer>

      <DefaultLogo />

      <ProfessionalContainer>
        <BoldText>Médico(a): <Text>Luiz Tinoco Gomes</Text></BoldText>

        <BoldText>Especialidade: <Text>Luiz Tinoco Gomes</Text></BoldText>

        <BoldText>Horário: <Text>20/04/2022 - 14:30</Text></BoldText>
      </ProfessionalContainer>

      <PatientContainer >
        <BoldText>Médico(a): <Text>Luiz Tinoco Gomes</Text></BoldText>

        <BoldText>Especialidade: <Text>Luiz Tinoco Gomes</Text></BoldText>

        <BoldText>Horário: <Text>20/04/2022 - 14:30</Text></BoldText>
      </PatientContainer>

    </HeaderContainer>
  )
}

export const DoctorHeader = () => (
  <HeaderContainer>

    <DefaultLogo />

    <PatientDoctorContainer >
      <BoldText>Médico(a): <Text>Luiz Tinoco Gomes</Text></BoldText>

      <BoldText>Especialidade: <Text>Luiz Tinoco Gomes</Text></BoldText>

      <BoldText>Horário: <Text>20/04/2022 - 14:30</Text></BoldText>
    </PatientDoctorContainer>

  </HeaderContainer>
)