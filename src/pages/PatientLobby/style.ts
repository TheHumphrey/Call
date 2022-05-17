import styled from 'styled-components'

import { BsFillBagCheckFill } from "react-icons/bs"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 32px;
`

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 85%;

  margin-top: 32px;

  background: ${({ theme }) => theme.colors.white};

  padding: 32px;
  
  box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25);
  border-radius: 8px;
`

export const ConfigContainer = styled.div`
  display: flex;
  margin-top: 50px;
`

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 65px;
  margin-top: 150px;

  @media only screen and (max-width: 1366px) {
    margin-top: 20px;
    margin-left: 20px;
  }
`

export const WebCam = styled.div`
  width: 884px;
  height: 497px;
  margin-left: 45px;

  @media only screen and (max-width: 1366px) {
    margin-left: 140px;
  }
`

export const DropdownContainer = styled.div`
  display: flex;
  width: 480px;
  justify-content: space-between;

  margin-top: 20px;

  @media only screen and (max-width: 1366px) {
    width: 450px;
  }
`

export const LobbyTitle = styled.h1`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.cinza2};
`

type TLabel = {
  withMargin?: boolean;
}

export const Label = styled.label<TLabel>`
  width: 420px;
  height: 24px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;

  ${({ withMargin }) => withMargin && 'margin-top: 10px;'}

  color: ${({ theme }) => theme.colors.grayDark};
`

export const LabelCheck = styled(Label)`
  margin-top: 20px;
`

export const LabelAwait = styled(Label)`
  justify-content: center;
  margin-top: 50px;

  color: ${({ theme }) => theme.colors.cinza2};
`

export const BsBagCheckFillCustom = styled(BsFillBagCheckFill)`
  margin-bottom: 5px;
  margin-right: 10px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
`

export const ButtonNext = styled.button`
  width: 480px;
  height: 40px;
  border-radius: 10px;
  border: none;
  
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  :hover {
    cursor: pointer;
    transition: 0,5s;
    background-color: ${({ theme }) => theme.colors.blueMedium};
  }
`

export const AwaitDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`