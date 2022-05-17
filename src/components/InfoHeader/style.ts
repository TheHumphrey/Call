import styled from "styled-components"

import logo from 'assets/logo-umc.png'

export const HeaderContainer = styled.div`
  width: auto;

  display: flex;
  flex-direction: row;
`

export const DefaultLogo = styled.img`
  width: 5vw;
  height: 5vw;

  background: ${({ theme }) => theme.colors.white};

  background: url(${logo}) center top no-repeat;
  background-size: 100%;

  box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25);
  border-radius: 8px;

  :hover {
    border: 1px solid #1F7FDF;
  }
`

export const ProfessionalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 8px 8px 16px;

  width: 48vw;
  height: 96px;
  
  margin-left: 32px;

  background: ${({ theme }) => theme.colors.white};

  box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25);
  border-radius: 8px;
`

export const PatientContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 8px 8px 16px;
  
  width: 48vw;
  height: 96px;
  
  margin-left: 32px;

  background: ${({ theme }) => theme.colors.white};

  box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25);
  border-radius: 8px;
`

export const PatientDoctorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 8px 8px 16px;
  
  width: 28vw;
  height: 96px;
  
  margin-left: 32px;

  background: ${({ theme }) => theme.colors.white};

  box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25);
  border-radius: 8px;
`

export const BoldText = styled.span`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin-top: 2px;

  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grayLight};
`

export const Text = styled.span`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;

  margin-left: 5px;
  margin-top: 2px;

  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grayDark};
`