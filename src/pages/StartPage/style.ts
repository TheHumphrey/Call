import styled from 'styled-components'

import logo from 'assets/logo-umc.png'

export const Container = styled.div`
  position: absolute;
  left: 2.22%;
  right: 2.22%;
  top: 3.12%;
  bottom: 3.12%;
  background: ${({ theme }) => theme.colors.corPrimariaClaro2};

  box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25);
  border-radius: 8px;
`

export const LogoContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 112px;

  background: url(${logo}) center top no-repeat;
  background-size: 100%;

  background-color: ${({ theme }) => theme.colors.white};

  box-sizing: border-box;
  border-radius: 16px;

  :hover {
    border: 1px solid #1F7FDF;
  }
`

export const Title = styled.h3`
  position: absolute;
  width: 1376px;
  height: 32px;
  top: 431px;
  left: 0;
  right: 0;

  margin-left: auto;
  margin-right: auto;

  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: ${({ theme }) => theme.colors.corPrimaria};
`

export const Text = styled.span`
  position: absolute;
  width: 640px;
  height: 48px;
  top: 510px;
  left: 0;
  right: 0;

  margin-left: auto;
  margin-right: auto;

  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.corPrimaria};
`

export const ButtonNext = styled.button`
  position: absolute;
  width: 183px;
  height: 40px;
  border-radius: 10px;
  border: none;

  top: 583px;
  left: 0;
  right: 0;

  margin-left: auto;
  margin-right: auto;
  
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