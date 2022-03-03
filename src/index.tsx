import { ChatProvider } from 'components'
import { VideoProvider } from 'components/VideoProvider'
import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import AppStateProvider, { useAppState } from 'state'
import useConnectionOptions from 'utils/useConnectionOptions/useConnectionOptions'
import App from './App'

type TVideoAppProps = {
  children: ReactElement;
}

const VideoAPP = ({ children }: TVideoAppProps) => {
  const { setError } = useAppState()
  const connectionOptions = useConnectionOptions()

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ChatProvider >
        {children}
      </ChatProvider>
    </VideoProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <VideoAPP>
        <App />
      </VideoAPP>
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
