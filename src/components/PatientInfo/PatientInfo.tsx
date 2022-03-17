import {
  ContainerTitle,
  Title,
  Text,
  SubText,
} from "./style"

import { TPatient } from "types"
import { getCurrentAge } from "utils/helpers"

type TProps = {
  patientInfos: TPatient;
  doctorName?: string;
  title?: string;
  modalStyle?: boolean;
  isDoctorName?: boolean;
}

export const PatientInfo = (props: TProps) => {
  const {
    patientInfos,
    title,
    modalStyle,
    isDoctorName,
    doctorName
  } = props

  const {
    fullname,
    birthdate,
    // healthPlans,
    reason,
  } = patientInfos

  return (
    <ContainerTitle modalStyle={modalStyle}>

      {title && <Title>{title}</Title>}

      {isDoctorName && (
        <Text>
          Medico:{' '}
          <SubText>{doctorName ? `Dr. ${doctorName}` : ''}</SubText>
        </Text>
      )}

      <Text>
        Paciente:{' '}
        <SubText>{fullname || ''}</SubText>
      </Text>

      <Text>
        Idade:{' '}
        <SubText>{birthdate ? `${getCurrentAge(birthdate)} anos` : ''}</SubText>
      </Text>

      {/* <Text>
        Plano convênio:{' '}
        <SubText>{healthPlans}</SubText>
      </Text> */}

      {
        reason && (
          <Text>
            Motivo consulta:{' '}
            <SubText>{reason || ''}</SubText>
          </Text>
        )
      }
    </ContainerTitle>
  )
}