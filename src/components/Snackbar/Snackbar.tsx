import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton } from '@material-ui/core'
import MUISnackbar from '@material-ui/core/Snackbar'

import {
  Container,
  ContentContainer,
  CustomTypography,
  IconContainer,
} from './style'

import ErrorIcon from 'icons/ErrorIcon'
import WarningIcon from 'icons/WarningIcon'
import InfoIcon from 'icons/InfoIcon'

interface SnackbarProps {
  headline: string;
  message: string | React.ReactNode;
  variant?: 'error' | 'warning' | 'info';
  open: boolean;
  handleClose?: () => void;
}

export const Snackbar = ({ headline, message, variant, open, handleClose }: SnackbarProps) => {
  const handleOnClose = (_: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    handleClose?.()
  }

  return (
    <MUISnackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleOnClose}
      autoHideDuration={10000}
    >
      <Container variant={variant} >
        <ContentContainer >
          <IconContainer >
            {variant === 'warning' && <WarningIcon />}
            {variant === 'error' && <ErrorIcon />}
            {variant === 'info' && <InfoIcon />}
          </IconContainer>
          <div>
            <CustomTypography variant="body1" >
              {headline}
            </CustomTypography>
            <CustomTypography variant="body1">
              {' '}
              {message}
            </CustomTypography>
          </div>
        </ContentContainer>
        <div>
          {handleClose && (
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </div>
      </Container>
    </MUISnackbar>
  )
}
