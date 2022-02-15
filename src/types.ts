import { TwilioError, Track, VideoBandwidthProfileOptions, LocalVideoTrack, RemoteVideoTrack } from 'twilio-video'

declare module 'twilio-video' {
  interface LocalVideoTrack {
    isSwitchedOff: undefined
    setPriority: undefined
  }
}

export type RoomType = 'group' | 'group-small' | 'peer-to-peer' | 'go'

export type RecordingRule = {
  type: 'include' | 'exclude'
  all?: boolean
  kind?: 'audio' | 'video'
  publisher?: string
};

export type RecordingRules = RecordingRule[]

export type ErrorCallback = (error: TwilioError | Error) => void

export type Callback = (...args: any[]) => void

export interface Settings {
  trackSwitchOffMode: VideoBandwidthProfileOptions['trackSwitchOffMode'];
  dominantSpeakerPriority?: Track.Priority;
  bandwidthProfileMode: VideoBandwidthProfileOptions['mode'];
  maxAudioBitrate: string;
  contentPreferencesMode?: 'auto' | 'manual';
  clientTrackSwitchOffControl?: 'auto' | 'manual';
}

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;