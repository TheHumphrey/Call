import { formatDate } from "utils/helpers";
import {
  Container,
  TypeNameContainer,
  Name,
  RegisterContainer,
  Date,
  Register,
  RegisterContainerWrapper,
  NewRegisterArea,
  Text,
  ReferContainer,
  NewRegisterText,
  ClinicTypesContainer,
  RegisterWrapper,
} from "./style";

interface Props {
  setToggleModal: any,
  clinicTypes: any,
  onChangeDocument: any,
}

export const ClinicType = ({ setToggleModal, clinicTypes, onChangeDocument }: Props) => {
  function renderRegister(datas: any, name: any, index?: any) {
    const lastDocument = datas[datas.length - 1];

    if (lastDocument) {
      return (
        <RegisterContainer index={index}>
          <Date>{formatDate(lastDocument?.createdAt)}</Date>
          <Register>{lastDocument?.data}</Register>
        </RegisterContainer>
      );
    }

    return (
      <RegisterContainer withoutRegister index={index}>
        <Register>{`Não existe registro de ${name} para o último atendimento`}</Register>
      </RegisterContainer>
    );
  }
  return (
    <Container>
      {clinicTypes.map((type: any, index: any) => {
        return (
          <ClinicTypesContainer>
            <TypeNameContainer index={index}>
              <Name>{type.name}</Name>
            </TypeNameContainer>

            <RegisterContainerWrapper>
              <RegisterWrapper>
                {index === 0 && (
                  <ReferContainer>
                    <Text>Registros do último atendimento:</Text>
                  </ReferContainer>
                )}

                {index === 0 && <NewRegisterText>Registro atual:</NewRegisterText>}

                {renderRegister(type.data, type.name, index)}

                <NewRegisterArea index={index} onChange={(event: any) => onChangeDocument(event.target.value, type.type)} />
              </RegisterWrapper>
            </RegisterContainerWrapper>
          </ClinicTypesContainer>
        );
      })}
    </Container>
  );
}
