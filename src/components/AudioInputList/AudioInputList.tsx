import { useEffect, useState } from 'react'
import { LocalAudioTrack } from 'twilio-video'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import { SELECTED_AUDIO_INPUT_KEY } from 'utils/constants'
import { useDevices, useMediaStreamTrack, useVideoContext } from 'hooks'
import styled from 'styled-components'

const Container = styled.div`
  width: 375px;
  height: 40px;

  @media only screen and (max-width: 1366px) {
    width: 305px;
    height: 34px;
    font-size: 16px;
  }

  @media only screen and (max-width: 911px) {
    width: 224px;
    height: 24px;
  }
`

const SelectCustom = styled(Select)`
  height: 40px;

  @media only screen and (max-width: 1366px) {
    height: 34px;
    .MuiSelect-select{
      font-size: 16px;
    }
  }

  @media only screen and (max-width: 911px) {
    height: 24px;
    .MuiSelect-select{
      font-size: 12px;
    }
  }
`

export const AudioInputList = () => {
  const [audioList, setAudioList] = useState<any>([])
  const { audioInputDevices } = useDevices()
  const { localTracks } = useVideoContext()

  const localAudioTrack = localTracks.find(track => track.kind === 'audio') as LocalAudioTrack
  const mediaStreamTrack = useMediaStreamTrack(localAudioTrack)
  const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId

  useEffect(() => {
    setAudioList(audioInputDevices)
  }, [audioInputDevices])

  function replaceTrack(newDeviceId: string) {
    window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId)
    localAudioTrack.restart({ deviceId: { exact: newDeviceId } })
  }

  return (
    <Container>
      <div className="inputSelect">
        {audioList.length > 1 ? (
          <FormControl fullWidth>
            <SelectCustom
              onChange={e => replaceTrack(e.target.value as string)}
              value={localAudioInputDeviceId || ''}
              variant="outlined"
            >
              {audioList.map((device: any) => (
                <MenuItem value={device.deviceId} key={device.deviceId} className="test">
                  {device.label}
                </MenuItem>
              ))}
            </SelectCustom>
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <SelectCustom
              onChange={e => replaceTrack(e.target.value as string)}
              value={localAudioInputDeviceId || ''}
              variant="outlined"
            >
              <MenuItem value="">
                {localAudioTrack?.mediaStreamTrack.label || 'No Local Audio'}
              </MenuItem>
            </SelectCustom>
          </FormControl>
        )}
      </div>
    </Container>
  )
}
