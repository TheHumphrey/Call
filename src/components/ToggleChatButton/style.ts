import styled from "styled-components";


const ANIMATION_DURATION = 700

type TCircleProps = {
  hasUnreadMessages?: boolean;
}

export const IconContainer = styled.div`
  position: relative;
  display: flex;
`

export const Circle = styled.div<TCircleProps>`
  width: 10px;
  height: 10px;
  background-color: #5BB75B;
  border-radius: 50%;
  position: absolute;
  top: -3px;
  left: 13px;
  opacity: ${({ hasUnreadMessages }) => hasUnreadMessages ? 1 : 0};
  transition: opacity ${ANIMATION_DURATION * 0.5}ms ease-in;
`