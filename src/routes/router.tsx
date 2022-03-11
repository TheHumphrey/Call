import { Route, BrowserRouter, Routes } from 'react-router-dom'
import styled from 'styled-components'

import {
  DoctorLobby,
  FormTelemd,
  Room,
  RoomNotFound
} from 'pages'

import { useRoomState } from 'hooks'
import { ClinicRegisterWrapper } from 'components'
import { TDataProntuario } from 'types'

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
        <Room doctor />
      </Main>
    )}
  </>
);

const AppRouter = () => {
  const roomState = useRoomState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/formtest" element={<ClinicRegisterWrapper datas={{} as TDataProntuario} getDocumentsAfterSave={() => { }} token="aa" />} />
        <Route path="/" element={<RoomNotFound />} />
        <Route path="/:URLRoomName" element={<App roomState={roomState} />} />
        <Route path="/doctor/:token/:URLRoomName" element={<AppDoctor roomState={roomState} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter