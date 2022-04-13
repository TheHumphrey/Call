import styled from 'styled-components'

export const Container = styled.div`
  height: 56px;
  background: #F4F4F6;
  border-bottom: 1px solid #E4E7E9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`

export const Text = styled.div`
  font-weight: bold;
  font-family: 'Roboto';
  font-size: 1.3em;
  color: ${({ theme }) => theme.colors.grayDark};

  @media only screen and (max-width: 1366px) {
    font-size: 1.19em;
  }

  @media only screen and (max-width: 911px) {
    font-size: 1em;
  }
`

export const CloseChatWindow = styled.button`
  cursor: pointer;
  display: flex;
  background: transparent;
  border: 0;
  padding: 0.4em;
`