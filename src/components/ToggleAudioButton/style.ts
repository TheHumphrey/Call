import styled from 'styled-components'

type TIconButton = {
  isEnable?: boolean;
}

export const IconButton = styled.button<TIconButton>`
  width: 40px;
  height: 40px;

  background-color: ${({ theme, disabled }) => disabled ? theme.colors.whiteDark : theme.colors.blueLight};
  border-radius: 2px;
  border: none;

  color: ${({ theme, isEnable, disabled }) => disabled ? theme.colors.grayLight : isEnable ? theme.colors.primary : theme.colors.secondary};

  :hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 1366px) {
    width: 34px;
    height: 34px;
  }

  @media only screen and (max-width: 911px) {
    width: 24px;
    height: 24px;
  }
`