import styled from 'styled-components'

import { IconType } from "react-icons"
import { BsTelephoneFill, BsTelephoneXFill } from 'react-icons/bs'
import { ToggleAudioButton, ToggleVideoButton } from 'components'

type TChatOpen = {
  isChatWindowOpen?: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 32px;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */

  width: 100%;
`

export const SectionContainer = styled.div`
`

export const PatientFormContainer = styled.div`
  width: 100%;
  height: 32.3vh;
  min-height: 132.09px;

  margin-top: 32px;
  padding: 32px;

  background: ${({ theme }) => theme.colors.white};

  box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25);
  border-radius: 8px;

  overflow-y: scroll;
  overflow-x: hidden;
  white-space: nowrap;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    gap: 16;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.cinza3};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.cinza4};
    border-radius: 8px;
  }
`

export const FomtTitle = styled.h1`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  margin: 0;

  color: ${({ theme }) => theme.colors.cinza2};
`

type TLabel = {
  withMargin?: boolean;
}

export const Label = styled.label<TLabel>`
  width: 100%;
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

export const JoinRoomContainer = styled.div<TChatOpen>`
  width: 62%;
  height: 46vh;
  min-height: 260px;
  margin-left: 32px;

  background: ${({ theme }) => theme.colors.white};

  box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25);
  border-radius: 8px;

  ${({ isChatWindowOpen }) => isChatWindowOpen && 'width: 42.1% !important;'}
`

export const CamContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const PrimaryCam = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
`

export const SecondaryCam = styled.div<TChatOpen>`
  display: flex;
  width: 280px;
  height: 158px;
  position: absolute;

  top: 5.2%;
  right: 5.6%;

  border-radius: 8px;

  ${({ isChatWindowOpen }) => isChatWindowOpen && 'right: 20.6% !important;'}
`

export const FormsContainer = styled.div<TChatOpen>`
  width: 100%;
  height: 47%;

  margin-top: 32px;

  background: ${({ theme }) => theme.colors.white};

  box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25);
  border-radius: 8px;
  ${({ isChatWindowOpen }) => isChatWindowOpen && 'width: 79.7% !important;'}
`

export const styleIcon = (icon: IconType) => {
  return styled(icon)`
    color: ${({ theme }) => theme.colors.white};

    :hover {
      color: ${({ theme }) => theme.colors.white};
      transition: .2s;
    }
  `
}

export const CallButton = styled.button`
  display: flex;
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 0;

  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
  background-color: transparent;
  border: none;

  :hover {
    cursor: pointer;
  }
`

type TCallButtonProps = {
  isText?: boolean;
  isRed?: boolean;
}

export const CallButtonIcon = styled.div<TCallButtonProps>`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ isRed, theme }) => isRed ? theme.colors.secondary : theme.colors.greenMedium};
  justify-content: center;
  align-items: center;
  ${({ isText }) => isText && 'margin-left: 8px;'}
  ${({ isText }) => isText && 'margin-right: 8px;'}

  :hover {
    background-color: ${({ isRed, theme }) => isRed ? theme.colors.red1 : theme.colors.greenLight};
  }
`

export const TelephoneFillIcon = styleIcon(BsTelephoneFill)

export const TelephoneXFillIcon = styleIcon(BsTelephoneXFill)

export const JoinTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 50%;

  padding: 32px;
`

export const TitleText = styled.span`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  color: ${({ theme }) => theme.colors.corPrimaria};
`

type TDefaultTextProps = {
  withMargin?: boolean;
}

export const DefaultText = styled.span<TDefaultTextProps>`
  display: flex;
  align-items: center;

  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  ${({ withMargin }) => withMargin && 'margin-top: 16px;'}

  color: ${({ theme }) => theme.colors.cinza1};
`

export const BottomMenu = styled.div<TChatOpen>`
  display: flex;
  width: 224px;
  height: 56px;
  position: absolute;

  right: 26%;
  top: 40%;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.grayDark};
  flex-direction: row;
  border-radius: 8px;
  ${({ isChatWindowOpen }) => isChatWindowOpen && 'right: 35.5% !important;'}
`

export const AudioButton = styled(ToggleAudioButton)`
  width: 56px;
  height: 56px;

  background-color: transparent;
  font-size: 20px;
`

export const VideoButton = styled(ToggleVideoButton)`
  width: 56px;
  height: 56px;
  background-color: transparent;
  font-size: 20px;
`