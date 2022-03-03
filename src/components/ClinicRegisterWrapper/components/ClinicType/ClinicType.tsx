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
  ButtonMoreRegister,
  ReferContainer,
  NewRegisterText,
} from "./style";

interface Props {
  setToggleModal: any,
  clinicTypes: any,
  onChangeDocument: any,
}

export const ClinicType = ({ setToggleModal, clinicTypes, onChangeDocument }: Props) => {
  function renderRegister(datas: any, name: any) {
    const lastDocument = datas[datas.length - 1];

    if (lastDocument) {
      return (
        <RegisterContainer>
          <Date>{formatDate(lastDocument?.createdAt)}</Date>
          <Register>{lastDocument?.data}</Register>
        </RegisterContainer>
      );
    }

    return (
      <RegisterContainer withoutRegister>
        <Register>{`Não existe registro de ${name} para o último atendimento`}</Register>
      </RegisterContainer>
    );
  }
  return (
    <Container>
      {clinicTypes.map((type: any, index: any) => {
        return (
          <div style={{ display: "flex", marginBottom: "16px" }}>
            <TypeNameContainer>
              <Name>{type.name}</Name>
            </TypeNameContainer>

            <RegisterContainerWrapper>
              <div style={{ display: "flex", position: "relative" }}>
                {index === 0 && (
                  <ReferContainer>
                    <Text>Registros do último atendimento:</Text>
                    <ButtonMoreRegister onClick={() => setToggleModal(true)}>
                      MAIS REGISTROS
                    </ButtonMoreRegister>
                  </ReferContainer>
                )}

                {index === 0 && <NewRegisterText>Registro atual:</NewRegisterText>}

                {renderRegister(type.data, type.name)}

                <NewRegisterArea onChange={(event: any) => onChangeDocument(event.target.value, type.type)} />
              </div>
            </RegisterContainerWrapper>
          </div>
        );
      })}
    </Container>
  );
}
