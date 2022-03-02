import { Route, BrowserRouter, Routes } from 'react-router-dom'
import styled from 'styled-components'

import {
  DoctorLobby,
  FormTelemd,
  Room,
  RoomNotFound
} from 'pages'

import { useRoomState } from 'hooks'

const Main = styled.main`
  overflow: 'hidden';
  padding-bottom: 72px;
  background: 'black';
`

const App = ({ roomState }: any) => (
  <>
    {roomState === 'disconnected' ? (
      <FormTelemd />
    ) : (
      <Main>
        <Room />
      </Main>
    )}
  </>
);

const AppDoctor = ({ roomState }: any) => (
  <>
    {roomState === 'disconnected' ? (
      <DoctorLobby />
    ) : (
      <Main>
        <Room />
      </Main>
    )}
  </>
);

const AppRouter = () => {
  const roomState = useRoomState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomNotFound />} />
        <Route path="/:URLRoomName" element={<App roomState={roomState} />} />
        <Route path="/doctor/:URLRoomName" element={<AppDoctor roomState={roomState} />} />
        <Route path="/call" element={<Room />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter