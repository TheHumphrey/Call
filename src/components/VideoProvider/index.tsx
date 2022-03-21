import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { CreateLocalTrackOptions, ConnectOptions, LocalAudioTrack, LocalVideoTrack, Room } from 'twilio-video'
import { ErrorCallback } from 'types'
import { SelectedParticipantProvider } from './useSelectedParticipant/useSelectedParticipant'

import AttachVisibilityHandler from './AttachVisibilityHandler/AttachVisibilityHandler'
import useHandleRoomDisconnection from './useHandleRoomDisconnection/useHandleRoomDisconnection'
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed/useHandleTrackPublicationFailed'
import useLocalTracks from './useLocalTracks/useLocalTracks'
import useRestartAudioTrackOnDeviceChange from './useRestartAudioTrackOnDeviceChange/useRestartAudioTrackOnDeviceChange'
import useRoom from './useRoom/useRoom'
import useScreenShareToggle from './useScreenShareToggle/useScreenShareToggle'

export interface IVideoContext {
  room: Room | null;
  localTracks: (LocalAudioTrack | LocalVideoTrack)[];
  isConnecting: boolean;
  connect: (token: string) => Promise<void>;
  onError: ErrorCallback;
  getLocalVideoTrack: (newOptions?: CreateLocalTrackOptions) => Promise<LocalVideoTrack>;
  getLocalAudioTrack: (deviceId?: string) => Promise<LocalAudioTrack>;
  isAcquiringLocalTracks: boolean;
  removeLocalVideoTrack: () => void;
  isSharingScreen: boolean;
  toggleScreenShare: () => void;
  getAudioAndVideoTracks: () => Promise<void>;
  isBackgroundSelectionOpen: boolean;
  setIsBackgroundSelectionOpen: (value: boolean) => void;
}

export const VideoContext = createContext<IVideoContext>({} as IVideoContext)

interface VideoProviderProps {
  options?: ConnectOptions;
  onError?: ErrorCallback;
  children: ReactNode;
}

export const VideoProvider = ({ options, children, onError = () => { } }: VideoProviderProps) => {
  const onErrorCallback: ErrorCallback = useCallback(
    error => {
      console.log(`ERROR: ${error.message}`, error)
      onError(error)
    },
    [onError]
  )

  const {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks,
  } = useLocalTracks()
  const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, options)

  const [isSharingScreen, toggleScreenShare] = useScreenShareToggle(room, onError)

  useHandleRoomDisconnection(
    room,
    onError,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    isSharingScreen,
    toggleScreenShare
  )
  useHandleTrackPublicationFailed(room, onError)
  useRestartAudioTrackOnDeviceChange(localTracks)

  const [isBackgroundSelectionOpen, setIsBackgroundSelectionOpen] = useState(false)

  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        onError: onErrorCallback,
        getLocalVideoTrack,
        getLocalAudioTrack,
        connect,
        isAcquiringLocalTracks,
        removeLocalVideoTrack,
        isSharingScreen,
        toggleScreenShare,
        getAudioAndVideoTracks,
        isBackgroundSelectionOpen,
        setIsBackgroundSelectionOpen,
      }}
    >
      <SelectedParticipantProvider room={room}>{children}</SelectedParticipantProvider>
      <AttachVisibilityHandler />
    </VideoContext.Provider>
  )
}
