import styled, { keyframes } from "styled-components";

const scaleModal = keyframes`
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
`;

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.342);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  display: none;
  padding: 32px;
`;

export const BodyModal = styled.div<{ defaultSize?: boolean, withoutPadding: boolean }>`
  position: relative;
  animation: ${scaleModal} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: fit-content;
  max-width: ${({ defaultSize }) => defaultSize && "800px"};
  height: fit-content;
  max-height: ${({ defaultSize }) => defaultSize && "600px"};
  background-color: white;
  border-radius: 11px;
  display: none;
  flex-direction: column;
  overflow: visible;
  padding: ${({ withoutPadding }) => (withoutPadding ? "0" : "32px")};
`;

export const CloseButton = styled.div`
  position: absolute;
  right: 32px;
  top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ededed;
  border-radius: 5px;
  padding: 3px;
  font-size: 10pt;
  width: 20px;
  color: #666;

  :hover {
    cursor: pointer;
    background: #f3f3f3;
  }
`;