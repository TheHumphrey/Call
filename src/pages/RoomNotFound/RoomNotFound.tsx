import styled from 'styled-components'

export const Title = styled.h1`
font-family: 'Work Sans';
color: ${({ theme }) => theme.colors.primary};
width: 254px;
height: 56px;
font-weight: 600;
font-size: 48px;
line-height: 18px;
text-align: left;
letter-spacing: 8%;
`

export const TitleRoom = styled.h1`
font-family: 'Work Sans';
color: ${({ theme }) => theme.colors.primary};
width: 600px;
height: 56px;
font-weight: 600;
font-size: 48px;
line-height: 18px;
text-align: left;
letter-spacing: 8%;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`

export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 45px;
`

export const ContainerRoom = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`

export const RoomNotFound = () => {

  return (
    <Container>
      <ContainerTitle>
        <Title>TELEMED</Title>
      </ContainerTitle>

      <ContainerRoom>
        <TitleRoom>Sala não encontrada!</TitleRoom>
      </ContainerRoom>

    </Container>
  )
}