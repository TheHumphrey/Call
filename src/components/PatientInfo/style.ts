import styled from 'styled-components'

type TContainerProps = {
  modalStyle?: boolean;
}

export const ContainerTitle = styled.div<TContainerProps>`
  display: flex;
  flex-direction: column;
  user-select: text;

  ${({ modalStyle }) => modalStyle ? 'margin: 20px;' : 'margin-left: 45px;'}
`

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
  @media only screen and (max-width: 1380px) {
    margin: 2.2%;
  }
`

export const Text = styled.span`
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.grayLight};
  line-height: 21,09px;
  text-align: left;
`

export const SubText = styled.span`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.grayLight};
  line-height: 21,09px;

  white-space: normal;
  word-break: break-all;
`