import {
  ContainerTitle,
  Title,
  Text,
  SubText,
} from "./style"

import { TPaciente } from "types"

type TProps = {
  patientInfos: TPaciente;
  title?: string;
  modalStyle?: boolean;
  isDoctorName?: boolean;
}

export const PatientInfo = (props: TProps) => {
  const {
    patientInfos,
    title,
    modalStyle,
    isDoctorName
  } = props

  const {
    name,
    idade,
    planoConvenio,
    motivoConsulta,
    doctorName
  } = patientInfos

  return (
    <ContainerTitle modalStyle={modalStyle}>

      {title && <Title>{title}</Title>}

      {!isDoctorName && (
        <Text>
          Medico:{' '}
          <SubText>{doctorName}</SubText>
        </Text>
      )}

      <Text>
        Paciente:{' '}
        <SubText>{name}</SubText>
      </Text>

      <Text>
        Idade:{' '}
        <SubText>{idade} anos</SubText>
      </Text>

      <Text>
        Plano convênio:{' '}
        <SubText>{planoConvenio}</SubText>
      </Text>

      <Text>
        Motivo consulta:{' '}
        <SubText>{motivoConsulta}</SubText>
      </Text>

    </ContainerTitle>
  )
}