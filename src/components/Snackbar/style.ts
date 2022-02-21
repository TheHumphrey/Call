import styled from 'styled-components'

import { Typography } from '@material-ui/core'

type TContainerProps = {
  variant?: 'error' | 'warning' | 'info';
}

export const Container = styled.div<TContainerProps>`
  display: flex;
  justify-content: space-between;
  width: 400px;
  min-height: 50px;
  background: ${({ theme }) => theme.colors.white};
  padding: 1em;
  border-radius: 3px;
  box-shadow: 0 12px 24px 4px rgba(40, 42, 43, .2);
  ${({ variant }) => variant === 'error' ? 'border-left: 4px solid #D61F1F;' : null}
  ${({ variant }) => variant === 'warning' ? 'border-left: 4px solid #E46216' : null}
  ${({ variant }) => variant === 'info' ? 'border-left: 4px solid #0263e0' : null}
`

export const ContentContainer = styled.div`
  display: flex;
  line-height: 1.8;
`

export const IconContainer = styled.div`
  display: flex;
  padding: 0 1.3em 0 0.3em;
  transform: translate(3px);
`

export const CustomTypography = styled(Typography)`
  font-weight: bold !important;
`