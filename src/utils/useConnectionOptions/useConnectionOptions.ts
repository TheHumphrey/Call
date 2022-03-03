import { useAppState } from 'state'
import { ConnectOptions } from 'twilio-video'
import { isMobile, removeUndefineds } from 'utils'

const useConnectionOptions = () => {
  const { roomType, settings } = useAppState()

  const connectionOptions: ConnectOptions = {
    bandwidthProfile: {
      video: {
        mode: settings.bandwidthProfileMode,
        dominantSpeakerPriority: settings.dominantSpeakerPriority,
        trackSwitchOffMode: settings.trackSwitchOffMode,
        contentPreferencesMode: settings.contentPreferencesMode,
        clientTrackSwitchOffControl: settings.clientTrackSwitchOffControl,
      },
    },
    dominantSpeaker: true,
    networkQuality: { local: 1, remote: 1 },

    maxAudioBitrate: Number(settings.maxAudioBitrate),

    preferredVideoCodecs: [{ codec: 'VP8', simulcast: roomType !== 'peer-to-peer' && roomType !== 'go' }],

    //@ts-ignore - Internal use only. This property is not exposed in type definitions.
    environment: process.env.REACT_APP_TWILIO_ENVIRONMENT,
  }

  if (isMobile && connectionOptions?.bandwidthProfile?.video) {
    connectionOptions!.bandwidthProfile!.video!.maxSubscriptionBitrate = 2500000
  }

  if (process.env.REACT_APP_TWILIO_ENVIRONMENT === 'dev') {
    //@ts-ignore - Internal use only. This property is not exposed in type definitions.
    connectionOptions!.wsServer = 'wss://us2.vss.dev.twilio.com/signaling'
  }

  return removeUndefineds(connectionOptions)
}

export default useConnectionOptions
