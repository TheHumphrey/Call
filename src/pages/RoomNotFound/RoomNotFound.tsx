import {
  Container,
  ContainerTitle,
  Title,
  ContainerRoom,
  TitleRoom,
} from './style';



type TProps = {
  isCallEnd?: boolean;
}

export const RoomNotFound = ({ isCallEnd }: TProps) => {
  return (
    <Container>
      <ContainerTitle>
        <Title>{" "}</Title>
      </ContainerTitle>

      <ContainerRoom>
        <TitleRoom>{isCallEnd ? "Chamada finalizada!" : "Sala não encontrada!"}</TitleRoom>
      </ContainerRoom>
    </Container>
  )
}