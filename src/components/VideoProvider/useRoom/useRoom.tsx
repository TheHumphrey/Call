import { Callback } from 'types'
import { isMobile } from 'utils'
import Video, { ConnectOptions, LocalTrack, Room } from 'twilio-video'
import { VideoRoomMonitor } from '@twilio/video-room-monitor'
import { useCallback, useEffect, useRef, useState } from 'react'

window.TwilioVideo = Video

const useRoom = (localTracks: LocalTrack[], onError: Callback, options?: ConnectOptions) => {
  const [room, setRoom] = useState<Room | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const connect = useCallback(
    token => {
      setIsConnecting(true)
      return Video.connect(token, { ...optionsRef.current, tracks: localTracks }).then(
        newRoom => {
          setRoom(newRoom)
          VideoRoomMonitor.registerVideoRoom(newRoom)
          const disconnect = () => newRoom.disconnect()

          newRoom.setMaxListeners(15)

          newRoom.once('disconnected', () => {
            setTimeout(() => setRoom(null))
            window.removeEventListener('beforeunload', disconnect)

            if (isMobile) {
              window.removeEventListener('pagehide', disconnect)
            }
          })

          // @ts-ignore
          window.twilioRoom = newRoom

          newRoom.localParticipant.videoTracks.forEach(publication =>
            publication.setPriority('low')
          )

          setIsConnecting(false)

          window.addEventListener('beforeunload', disconnect)

          if (isMobile) {
            window.addEventListener('pagehide', disconnect)
          }
        },
        error => {
          onError(error)
          setIsConnecting(false)
        }
      )
    },
    [localTracks, onError]
  )

  return { room, isConnecting, connect }
}

export default useRoom
