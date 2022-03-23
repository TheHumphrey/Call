import styled from "styled-components"

type TRegisterContainer = {
  withoutRegister?: boolean;
  index?: number | string;
}

type TProps = {
  index?: number | string;
}

const heightT = {
  small: '60px',
  medium: '90px',
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  flex-direction: column;
  font-family: 'Roboto';
`

export const ClinicTypesContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  width: 100%;
`

export const RegisterWrapper = styled.div`
  display: flex;
`

export const TypeNameContainer = styled.div<TProps>`
  background: #91c7f7;
  border-radius: 8px;
  height: ${heightT.medium};
  width: 120px;
  display: flex;
  margin-top: ${({ index }) => index === 0 ? '30px' : '0px'};
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 1380px) {
    width: 16%;
    height: ${heightT.small};
  }

  @media only screen and (min-width: 1381px) and (max-width: 1890px) {
    height: ${heightT.small};
    width: 16%;
  }
`

export const Name = styled.p`
  color: #ffffff;
  font-size: .9rem;
  font-weight: bold;
`

export const RegisterContainerWrapper = styled.div`
  display: flex;
  width: calc(100% - 60px);
  flex-direction: column;
  position: relative;
`

export const RegisterContainer = styled.div<TRegisterContainer>`
  background: #d3e9fc;
  border: 1px solid #91c7f7;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  height: ${heightT.medium};
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  margin: 0 32px;
  width: 480px;
  overflow-y: scroll;
  white-space: break-spaces;
  
  margin-top: ${({ index }) => index === 0 ? '30px' : '0px'};
  justify-content: ${({ withoutRegister }) => withoutRegister && "center"};
  align-items: ${({ withoutRegister }) => withoutRegister && "center"};
  text-align: ${({ withoutRegister }) => withoutRegister && "center"};

  ::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 1380px) {
    height: ${heightT.small};
    width: 44%;
  }

  @media only screen and (min-width: 1381px) and (max-width: 1890px) {
    height: ${heightT.small};
    width: 44%;
  }
`

export const Date = styled.p`
  font-size: 1rem;
  color: #334254;
`

export const Register = styled.p`
  font-size: 1rem;
  color: #66717f;
  margin-top: 8px;
`

export const NewRegisterArea = styled.textarea<TProps>`
  background: #f4f9fe;
  border: 1px solid #91c7f7;
  box-sizing: border-box;
  border-radius: 8px;
  height: ${heightT.medium};
  resize: none;
  width: 100%;
  outline: none;
  font-size: 1rem;
  padding: 8px 16px;
  min-width: 470px;
  margin-top: ${({ index }) => index === 0 ? '30px' : '0px'};

  @media only screen and (max-width: 1380px) {
    height: ${heightT.small};
    width: 44%;
    min-width: 40%;
  }

  @media only screen and (min-width: 1381px) and (max-width: 1890px) {
    height: ${heightT.small};
    width: 44%;
    min-width: 40%;
  }
`

export const ButtonMoreRegister = styled.p`
  font-size: 1.4rem;
  color: #238fef;
  cursor: pointer;
`

export const ReferContainer = styled.div`
  display: flex;
  justify-content: space-between;
  top: -25px;
  left: 50px;
  position: absolute;
  width: 460px;

  @media only screen and (max-width: 1380px) {
    left: 34px;
  }

  @media only screen and (min-width: 1381px) and (max-width: 1890px) {
    left: 34px;
  }
`

export const Text = styled.p`
  font-size: 1rem;
  font-weight: bold;
`

export const NewRegisterText = styled.p`
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  top: -25px;
  right: 360px;

  @media only screen and (max-width: 1380px) {
    right: 228px;
  }

  @media only screen and (min-width: 1381px) and (max-width: 1890px) {
    right: 228px;
  }
`
