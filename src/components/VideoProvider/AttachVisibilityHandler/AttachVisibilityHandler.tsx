import { isMobile } from 'utils'
import { useEffect, useRef } from 'react'
import { useLocalVideoToggle, useVideoContext } from 'hooks'


const AttachVisibilityHandler = () => {
  const { room } = useVideoContext()
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle()
  const shouldRepublishVideoOnForeground = useRef(false)

  useEffect(() => {
    if (room && isMobile) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden' && isVideoEnabled) {
          shouldRepublishVideoOnForeground.current = true
          toggleVideoEnabled()

        } else if (shouldRepublishVideoOnForeground.current) {
          shouldRepublishVideoOnForeground.current = false
          toggleVideoEnabled()
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }
  }, [isVideoEnabled, room, toggleVideoEnabled])

  return null
}

export default AttachVisibilityHandler
