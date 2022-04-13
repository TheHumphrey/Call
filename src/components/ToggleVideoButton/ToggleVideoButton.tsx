import React, { useCallback, useRef } from 'react';
import { useDevices, useLocalVideoToggle } from "hooks"

import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs"

import { IconButton } from "./style"
import styled from 'styled-components';

const BsCameraVideoCustom = styled(BsCameraVideo)`
  @media only screen and (max-width: 911px) {
    margin-top: 3px;
    width: 13px;
    height: 13px;
  }
`
const BsCameraVideoOffCustom = styled(BsCameraVideoOff)`
  @media only screen and (max-width: 911px) {
    margin-top: 3px;
    width: 13px;
    height: 13px;
  }
`

export const ToggleVideoButton = (props: { disabled?: boolean; className?: string, fill?: string }) => {
  const { disabled, className, fill } = props
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);
  const { hasVideoInputDevices } = useDevices();

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);

  return (
    <>
      <IconButton
        className={className}
        onClick={toggleVideo}
        isEnable={isVideoEnabled}
        disabled={!hasVideoInputDevices || disabled}
        fill={fill}
      >
        {isVideoEnabled ? (<BsCameraVideoCustom />) : (<BsCameraVideoOffCustom />)}
      </IconButton>
    </>
  )
}