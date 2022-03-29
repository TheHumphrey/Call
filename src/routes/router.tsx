import { Route, BrowserRouter, Routes } from 'react-router-dom'
import styled from 'styled-components'

import {
  DoctorLobby,
  FormTelemd,
  Room,
  RoomNotFound,
  DoctorRoom
} from 'pages'

import { useRoomState } from 'hooks'
import { DoctorProvider } from 'components'

const Main = styled.main`
  overflow: 'hidden';
  padding-bottom: 72px;
  background: 'black';
`

const App = ({ roomState }: any) => (
  <DoctorProvider>
    {roomState === 'disconnected' ? (
      <FormTelemd />
    ) : (
      <Main>
        <Room />
      </Main>
    )}
  </DoctorProvider>
);

const AppDoctor = ({ roomState }: any) => (
  <DoctorProvider>
    {roomState === 'disconnected' ? (
      <DoctorLobby />
    ) : (
      <Main>
        <DoctorRoom />
      </Main>
    )}
  </DoctorProvider>
);

const AppRouter = () => {
  const roomState = useRoomState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomNotFound />} />
        <Route path="/:URLRoomName" element={<App roomState={roomState} />} />
        <Route path="/doctor/:token/:URLRoomName/:patientId" element={<AppDoctor roomState={roomState} />} />
        <Route path="/callend" element={<RoomNotFound isCallEnd />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter