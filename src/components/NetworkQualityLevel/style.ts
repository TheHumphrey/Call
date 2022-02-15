import styled from 'styled-components'

export const OuterContainer = styled.div`
  width: 2em;
  height: 2em;
  padding: 0.9em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`

export const InnerContainer = styled.div`
  display: 'flex';
  align-items: 'flex-end';
`

type TLevel = {
  level: number;
  STEP: number;
  networkQualityLevel: number;
}

export const Level = styled.div<TLevel>`
  width: 2px;
  height: ${({ STEP, level }) => STEP * (level + 1)}px;
  margin-right: 1px;

  background: ${({ networkQualityLevel, level }) => networkQualityLevel > level ? 'white' : 'rgba(255, 255, 255, 0.2)'};

  :not(:last-child){
    border-right: none;
  }
`