import styled from 'styled-components'
import { Modal, Box } from "@material-ui/core"

import { ToggleAudioButton, ToggleVideoButton, MainParticipant } from "components"

import { IconType } from "react-icons"

import {
  BsFileEarmarkText,
  BsClipboardX,
  BsX,
} from "react-icons/bs"

import { FaPrescriptionBottleAlt } from "react-icons/fa";

type TSecundaryCam = {
  isChatWindowOpen: boolean;
}

export const styleIcon = (icon: IconType) => {
  return styled(icon)`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.grayLight};
  justify-content: center;
  align-items: center;

  :hover {
    color: ${({ theme }) => theme.colors.white};
    transition: .2s;
  }
`
}

export const FileIcon = styleIcon(BsFileEarmarkText)

export const XIcon = styled(BsX)`
  position: absolute;
  right: 0;
  top: 0;

  width: 40px;
  height: 40px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.grayLight};

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary};
  }
`

export const ClipIcon = styleIcon(BsClipboardX)

export const BottleIcon = styleIcon(FaPrescriptionBottleAlt)

export const ModalCustom = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalBox = styled(Box)`
  position: absolute;
  background: white;
  width: 70%;
  height: 68%;
`

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

export const PrimaryCam = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;
  background-color: black;
`

export const CamParticipant = styled(MainParticipant)`
`


export const TopMenu = styled.div`
  display: flex;
  width: 229px;
  height: 24px;
  position: absolute;
  left: 45%;
  top: 4%;

  z-index: 10;

  flex-direction: row;
`

export const LabelMenu = styled.div`
  display: flex;
  width: 139px;
  height: 24px;
  border-radius: 2px 0px 0px 2px;

  background-color: ${({ theme }) => theme.colors.grayLight};
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const TimerMenu = styled.div`
  display: flex;
  width: 54px;
  height: 24px;
  border-radius: 0px 2px 2px 0px;

  background-color: ${({ theme }) => theme.colors.grayDark};
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ResolutionMenu = styled.div`
  display: flex;
  width: 32px;
  height: 24px;
  margin-left: 8px;
  border-radius: 2px;

  background-color: ${({ theme }) => theme.colors.grayDark};
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const BottomMenu = styled.div`
  display: flex;
  width: 280px;
  height: 56px;
  position: absolute;

  left: 45%;
  bottom: 5%;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.grayDark};
  flex-direction: row;
  border-radius: 4px;
`

export const SideMenu = styled.div<TSecundaryCam>`
  display: flex;
  flex-direction: column;
  width: 56px;
  height: 168px;
  position: absolute;

  right: ${({ isChatWindowOpen }) => isChatWindowOpen ? '22%' : '2%'};
  bottom: 42%;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.grayDark};
  border-radius: 4px;
`

export const PacientInfoContainer = styled.div`
  position: absolute;

  left: 10px;
  bottom: 10px;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`

export const SecondaryCam = styled.div<TSecundaryCam>`
  display: flex;
  width: 280px;
  height: 158px;
  position: absolute;

  top: 4%;
  right: ${({ isChatWindowOpen }) => isChatWindowOpen ? '20%' : '2%'};

  border-radius: 2px;
`

export const BottomButton = styled.button`
  display: flex;
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;
  border-radius: 4px;

  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
  background-color: transparent;
  border: none;

  :hover {
    cursor: pointer;
  }

  :active {
    background-color: ${({ theme }) => theme.colors.grayLight};
  }
`

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

export const CallButtonIcon = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
`

export const FullButtonIcon = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
`

export const SecundaryMenu = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  position: absolute;

  bottom: 0;

  border-radius: 4px;

  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
`

export const ConectionMenu = styled(SecundaryMenu)`
  top: 0;
  color: ${({ theme }) => theme.colors.greenLight};
`