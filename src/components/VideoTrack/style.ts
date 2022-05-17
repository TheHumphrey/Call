import styled from 'styled-components'

type TVideo = {
  doctorStyle?: boolean;
  withBorder?: boolean;
}

export const Video = styled.video<TVideo>`
  width: 100%;
  height: 100%;

  border-radius: ${({ doctorStyle }) => doctorStyle ? '8px' : '0px'};
  border-radius: ${({ withBorder }) => withBorder && '8px'};
`