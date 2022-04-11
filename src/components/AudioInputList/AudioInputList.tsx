import { LocalAudioTrack } from 'twilio-video'
import { FormControl, MenuItem, Typography, Select } from '@material-ui/core'
import { SELECTED_AUDIO_INPUT_KEY } from 'utils/constants'
import { useDevices, useMediaStreamTrack, useVideoContext } from 'hooks'
import styled from 'styled-components'

const Container = styled.div`
  width: 375px;
  height: 40px;

  @media only screen and (max-width: 1366px) {
    width: 355px;
  }
`

const SelectCustom = styled(Select)`
  height: 40px;
`

export const AudioInputList = () => {
  const { audioInputDevices } = useDevices()
  const { localTracks } = useVideoContext()

  const localAudioTrack = localTracks.find(track => track.kind === 'audio') as LocalAudioTrack
  const mediaStreamTrack = useMediaStreamTrack(localAudioTrack)
  const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId

  function replaceTrack(newDeviceId: string) {
    window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId)
    localAudioTrack.restart({ deviceId: { exact: newDeviceId } })
  }

  return (
    <Container>
      <div className="inputSelect">
        {audioInputDevices.length > 1 ? (
          <FormControl fullWidth>
            <SelectCustom
              onChange={e => replaceTrack(e.target.value as string)}
              value={localAudioInputDeviceId || ''}
              variant="outlined"
            >
              {audioInputDevices.map(device => (
                <MenuItem value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </MenuItem>
              ))}
            </SelectCustom>
          </FormControl>
        ) : (
          <Typography>{localAudioTrack?.mediaStreamTrack.label || 'No Local Audio'}</Typography>
        )}
      </div>
    </Container>
  )
}
