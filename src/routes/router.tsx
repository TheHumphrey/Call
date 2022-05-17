import { Route, BrowserRouter, Routes } from 'react-router-dom'
import styled from 'styled-components'

import {
  DoctorLobby,
  Room,
  RoomNotFound,
  StartPage,
  PatientForm,
  PatientLobby,
  DoctorStart
} from 'pages'

import { useParticipants, useRoomState, useVideoContext } from 'hooks'
import { DoctorProvider, PatientProvider } from 'components'
import { RoomStateType } from 'hooks/useRoomState/useRoomState'
import { useEffect, useState } from 'react'

const Main = styled.main`
  overflow: 'hidden';
  padding-bottom: 72px;
  background: 'black';
`

type TProviders = {
  type: 'start' | 'form' | 'lobby' | 'doctorstart' | 'doctorlobby';
  roomState?: RoomStateType;
  isDoctorConnected?: boolean;
}

const AppWithProvider = ({ type, roomState, isDoctorConnected }: TProviders) => (
  <PatientProvider>
    {type === 'start' && <StartPage />}
    {type === 'form' && <PatientForm />}
    {type === 'lobby' && (
      <>
        {roomState === 'disconnected' ? (
          <PatientLobby />
        ) : isDoctorConnected ? (
          <Main>
            <Room />
          </Main>
        ) : (
          <PatientLobby />
        )
        }
      </>
    )
    }
  </PatientProvider>
);

const AppDoctorWithProvider = ({ type }: TProviders) => (
  <DoctorProvider>
    {type === 'doctorstart' && <DoctorStart />}
    {type === 'doctorlobby' && <DoctorLobby />}
  </DoctorProvider>
);

const AppRouter = () => {
  const [isDoctorConnected, setIsDoctorConnected] = useState(false)

  const roomState = useRoomState()
  const participants = useParticipants()

  useEffect(
    () => {
      setIsDoctorConnected(participants.length !== 0)
    }, [participants]
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:tenant/:URLRoomName" element={<AppWithProvider type="start" />} />
        <Route path="/form/:tenant/:URLRoomName" element={<AppWithProvider type="form" />} />
        <Route path="/lobby/:tenant/:URLRoomName" element={<AppWithProvider type="lobby" roomState={roomState} isDoctorConnected={isDoctorConnected} />} />
        {/* <Route path="/doctor/:token/:URLRoomName/:patientId" element={<AppDoctor roomState={roomState} />} /> */}
        <Route path="/doctor/:tenant/:URLRoomName/:token" element={<AppDoctorWithProvider roomState={roomState} type="doctorstart" />} />
        <Route path="/doctor-lobby/:tenant/:URLRoomName/:token" element={<AppDoctorWithProvider type="doctorlobby" />} />
        <Route path="/callend" element={<RoomNotFound isCallEnd />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter