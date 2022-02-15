import React, { createContext, useContext, useReducer, useState } from 'react'
import { RecordingRules, RoomType } from '../types'
import { TwilioError } from 'twilio-video'
import { settingsReducer, initialSettings, Settings, SettingsAction } from './settings/settingsReducer'
import useActiveSinkId from './useActiveSinkId/useActiveSinkId'
import usePasscodeAuth from './usePasscodeAuth/usePasscodeAuth'

export interface StateContextType {
  error: TwilioError | Error | null;
  setError(error: TwilioError | Error | null): void;
  getToken(name: string, room: string, passcode?: string): Promise<{ room_type: RoomType; access_token: string }>
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
      getToken: async (identity_user, room) => {
        const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/token'

        return fetch(endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            identity_user,
            room,
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

  const getToken: StateContextType['getToken'] = (name, room) => {
    setIsFetching(true)
    return contextValue
      .getToken(name, room)
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
    <StateContext.Provider value={{ ...contextValue, getToken, updateRecordingRules }}>
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
