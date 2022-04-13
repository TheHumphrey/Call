import styled from 'styled-components'

import { BsFillBagCheckFill } from "react-icons/bs"

type TIconButton = {
  isEnable?: boolean;
}

type TLabel = {
  withMargin?: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`

export const ContainerSettings = styled.div`
  display: flex;
  margin-top: 40px;

  @media only screen and (max-width: 1366px) {
    margin-top: 20px;
  }

  @media only screen and (max-width: 911px) {
    margin-top: 10px;
  }
`

export const WebCam = styled.div`
  width: 884px;
  height: 497px;
  margin-left: 45px;

  @media only screen and (max-width: 1366px) {
    margin-left: 140px;
  }

  @media only screen and (max-width: 911px) {
    margin-left: 70px;
  }
`

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 65px;
  margin-top: 100px;

  @media only screen and (max-width: 1366px) {
    margin-top: 80px;
    margin-left: 20px;
  }

  @media only screen and (max-width: 911px) {
    margin-top: 20px;
    margin-left: 10px;
  }
`

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

  @media only screen and (max-width: 1366px) {
    font-size: 16px;
    ${({ withMargin }) => withMargin && 'margin-top: 4px;'}
  }

  @media only screen and (max-width: 911px) {
    font-size: 12px;
    ${({ withMargin }) => withMargin && 'margin-top: 2px;'}
  }
`

export const LabelCheck = styled(Label)`
  margin-top: 20px;

  @media only screen and (max-width: 1366px) {
    margin-top: 10px;
    font-size: 16px;
  }

  @media only screen and (max-width: 911px) {
    margin-top: 5px;

    font-size: 12px;
  }
`

export const UsernameInput = styled.input`
  width: 480px;
  height: 40px;

  background: ${({ theme }) => theme.colors.whiteMedium};
  border: 1px solid ${({ theme }) => theme.colors.whiteDark};
  box-sizing: border-box;
  border-radius: 8px;
  padding-left: 10px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grayLight};

  :focus-visible {
    outline-color: ${({ theme }) => theme.colors.whiteDark};
  }

  @media only screen and (max-width: 1366px) {
    width: 400px;
    height: 34px;
    font-size: 16px;
  }

  @media only screen and (max-width: 911px) {
    width: 280px;
    height: 20px;
    font-size: 12px;
  }
`

export const ButtonJoin = styled.button`
  width: 480px;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin-top: 20px;
  
  text-align: center;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 18px;
  line-height: 21,09px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  :hover {
    cursor: pointer;
    transition: 0,5s;
    background-color: ${({ theme }) => theme.colors.blueMedium};
  }

  @media only screen and (max-width: 1366px) {
    width: 400px;
    height: 34px;
    margin-right: 30px;
    margin-top: 10px;
    font-size: 16px;
  }

  @media only screen and (max-width: 911px) {
    width: 280px;
    height: 20px;
    font-size: 12px;
    margin-right: 30px;
    margin-top: 10px;
  }
`

export const DropdownContainer = styled.div`
  display: flex;
  width: 480px;
  justify-content: space-between;

  margin-top: 20px;

  @media only screen and (max-width: 1366px) {
    width: 400px;
    height: 34px;

    margin-top: 10px;
  }

  @media only screen and (max-width: 911px) {
    width: 280px;
    height: 24px;

    margin-top: 5px;
  }
`

export const IconButton = styled.button<TIconButton>`
  width: 40px;
  height: 40px;

  background-color: ${({ theme }) => theme.colors.blueLight};
  border-radius: 2px;
  border: none;

  color: ${({ theme, isEnable }) => isEnable ? theme.colors.primary : theme.colors.secondary};

  :hover {
    cursor: pointer;
  }
`

export const TempDropdownCamp = styled.input`
  width: 415px;
  height: 40px;

  background: ${({ theme }) => theme.colors.whiteMedium};
  border: 1px solid ${({ theme }) => theme.colors.whiteDark};
  box-sizing: border-box;
  border-radius: 8px;
  padding-left: 10px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grayLight};

  :focus-visible {
    outline-color: ${({ theme }) => theme.colors.whiteDark};
  }

  @media only screen and (max-width: 1366px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 911px) {
    font-size: 12px;
  }
`

export const BsBagCheckFillCustom = styled(BsFillBagCheckFill)`
  margin-bottom: 5px;
  margin-right: 10px;
`