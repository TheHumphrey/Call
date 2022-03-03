import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 100vw;
  height: 100vh;
`

export const Identity = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.1em 0.3em 0.1em 0;
  display: inline-flex;

  svg: {
    margin-left: 0.3em;
  };
  margin-right: 0.4em;
  align-items: center;
`

export const InfoContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
`

export const RecordingIndicator = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.1em 0.3em 0.1em 0;
  font-size: 1.2rem;
  height: 28px;
`

const pulsate = keyframes`
  0%
  {
    background: #A90000;
  }
  50%
  {
    background: #f00;
  }
  100% 
  {
    background: #A90000;
  };
`

export const Circle = styled.div`
  height: 12px;
  width: 12px;
  background: red;
  border-radius: 100%;
  margin: 0 0.6em;
  animation: 1.25s ${pulsate} ease-out infinite;
`

export const ReconnectingContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(40, 42, 43, 0.75);
  z-index: 1;
`

export const Typography = styled.div`
  color: inherit;
  font-family: 'Roboto';
`