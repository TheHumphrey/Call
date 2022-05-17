import React, { createContext, useContext, useReducer, useState } from 'react'
import { RecordingRules, RoomType } from '../types'
import { TwilioError } from 'twilio-video'
import { settingsReducer, initialSettings, Settings, SettingsAction } from './settings/settingsReducer'
import useActiveSinkId from './useActiveSinkId/useActiveSinkId'
import usePasscodeAuth from './usePasscodeAuth/usePasscodeAuth'

export interface StateContextType {
  error: TwilioError | Error | null;
  setError(error: TwilioError | Error | null): void;
  getToken(name: string, room: string, passcode?: string): Promise<{ room_type: RoomType; accessToken: string }>
  getTokenDoctor(name: string, room: string, authToken: string, passcode?: string): Promise<{ room_type: RoomType; accessToken: string }>
  signIn?(passcode?: string): Promise<void>;
  signOut?(): Promise<void>;
  isAuthReady?: boolean;
  isFetching: boolean;
  activeSinkId: string;
  setActiveSinkId(sinkId: string): void;
  settings: Settings;
  dispatchSetting: React.Dispatch<SettingsAction>;
  roomType?: RoomType;
  updateRecordingRules(room_sid: string, rules: RecordingRules): Promise<object>;
}

export const StateContext = createContext<StateContextType>(null!)
export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
  const [error, setError] = useState<TwilioError | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [activeSinkId, setActiveSinkId] = useActiveSinkId()
  const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings)
  const [roomType, setRoomType] = useState<RoomType>()

  let contextValue = {
    error,
    setError,
    isFetching,
    activeSinkId,
    setActiveSinkId,
    settings,
    dispatchSetting,
    roomType,
  } as StateContextType

  if (process.env.REACT_APP_SET_AUTH === 'passcode') {
    contextValue = {
      ...contextValue,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      ...usePasscodeAuth(),
    }
  } else {
    contextValue = {
      ...contextValue,
      getToken: async (tenant, code) => {
        const endpoint = `${process.env.REACT_APP_TOKEN_ENDPOINT}api/video-calls/patients/access-tokens` || '/token'

        return fetch(endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            tenant,
            code,
          }),
        }).then(res => res.json())
      },
      getTokenDoctor: async (code, professionalId, authToken) => {
        const endpoint = `${process.env.REACT_APP_TOKEN_ENDPOINT}api/video-calls/professionals/access-tokens` || '/token'

        return fetch(endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-access-token': authToken
          },
          body: JSON.stringify({
            professionalId,
            code,
          }),
        }).then(res => res.json())
      },
      updateRecordingRules: async (room_sid, rules) => {
        const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules'

        return fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ room_sid, rules }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json()

            if (!res.ok) {
              const recordingError = new Error(
                jsonResponse.error?.message || 'There was an error updating recording rules'
              )
              // @ts-ignore
              recordingError.code = jsonResponse.error?.code
              return Promise.reject(recordingError)
            }

            return jsonResponse
          })
          .catch(err => setError(err))
      },
    }
  }

  const getToken: StateContextType['getToken'] = (tenant, code) => {
    setIsFetching(true)
    return contextValue
      .getToken(tenant, code)
      .then(res => {
        setRoomType(res.room_type)
        setIsFetching(false)
        return res
      })
      .catch(err => {
        setError(err)
        setIsFetching(false)
        return Promise.reject(err)
      })
  }

  const getTokenDoctor: StateContextType['getTokenDoctor'] = (code, professionalId, authToken) => {
    setIsFetching(true)
    return contextValue
      .getTokenDoctor(code, professionalId, authToken)
      .then(res => {
        setRoomType(res.room_type)
        setIsFetching(false)
        return res
      })
      .catch(err => {
        setError(err)
        setIsFetching(false)
        return Promise.reject(err)
      })
  }

  const updateRecordingRules: StateContextType['updateRecordingRules'] = (room_sid, rules) => {
    setIsFetching(true)
    return contextValue
      .updateRecordingRules(room_sid, rules)
      .then(res => {
        setIsFetching(false)
        return res
      })
      .catch(err => {
        setError(err)
        setIsFetching(false)
        return Promise.reject(err)
      })
  }

  return (
    <StateContext.Provider value={{ ...contextValue, getToken, getTokenDoctor, updateRecordingRules }}>
      {props.children}
    </StateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider')
  }
  return context
}
