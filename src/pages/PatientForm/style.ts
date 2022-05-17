import styled from 'styled-components'


export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 32px;
`

export const FormContainer = styled.div`
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

export const FomtTitle = styled.h1`
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
  width: 720px;
  height: 24px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;

  ${({ withMargin }) => withMargin && 'margin-top: 16px;'}
  ${({ withMargin }) => withMargin && 'margin-bottom: 16px;'}

  color: ${({ theme }) => theme.colors.cinza2};
`

export const UsernameInput = styled.input`
  width: 680px;
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
    width: 450px;
  }
`

export const ReasonCheckBoxContainer = styled.div`
  width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

export const AutoCheckBoxContainer = styled.div`
  width: 1500px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
`

export const SintomaCheckBoxContainer = styled.div`
  width: 1750px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  /* border: 0; */
  border-color: ${({ theme }) => theme.colors.whiteDark};
  resize: none;
  font-size: 14px;
  font-family: 'Roboto';
  border-radius: 8px;
  outline: none;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grayLight};
  ::-webkit-scrollbar {
    display: none !important;
  }
`

export const TextAreaContainer = styled.div`
  display: flex;
  margin-top: 0.4em;
  padding: 0.48em 0em;
  width: 100%;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 16px;
`

export const ButtonNext = styled.button`
  width: 81px;
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
