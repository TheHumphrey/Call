import {
  ContainerTitle,
  Title,
  Text,
  SubText,
} from "./style"

type TPaciente = {
  name: string;
  idade: number;
  planoConvenio: string;
  motivoConsulta: string;
  doctorName?: string;
}

type TProps = {
  patientInfos: TPaciente;
  title?: string;
}

export const PatientInfo = (props: TProps) => {
  const { patientInfos, title } = props
  const { name, idade, planoConvenio, motivoConsulta, doctorName } = patientInfos

  return (
    <ContainerTitle>
      <Title>{title || ' '}</Title>
      <Text>
        Medico:{' '}
        <SubText>{doctorName}</SubText>
      </Text>
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