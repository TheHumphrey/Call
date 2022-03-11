import styled from "styled-components";

export const EditorContainer = styled.section`
  width: 100%;
  height: 100%;
  font-family: 'Roboto';
`;

export const EditorWrapper = styled.div<{ withoutBorder: boolean }>`
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: ${({ withoutBorder }) =>
    withoutBorder ? "none" : "2px 2px 8px 2px rgba(16, 64, 156, 0.25)"};
  /* box-shadow: 2px 2px 8px 2px rgba(16, 64, 156, 0.25); */
  border-radius: 8px;
  position: relative;

  .fr-wrapper {
    border: 0 !important;
    border-radius: 0 !important;
    .fr-element {
      @media only screen and (min-width: 1900px) {
        min-height: 235px;
        max-height: 235px;
      }
      @media only screen and (min-width: 1366px) and (max-width: 1890px) {
        min-height: 120px;
        max-height: 120px;
      }
      @media only screen and (min-width: 1280px) and (max-width: 1365px) {
        min-height: 85px;
        max-height: 85px;
      }
      @media only screen and (min-width: 1024px) and (max-width: 1279px) {
        min-height: 70px;
        max-height: 70px;
      }

      overflow:scroll;
      overflow-x:hidden;
      padding: 12px 32px;
      font-size: 1rem;
      font-family: 'Roboto';
    }
  }

  .fr-toolbar {
    border: 0 !important;
    border-radius: 0 !important;
    border-radius: 0px 0px 8px 8px !important;
  }

  .fr-newline {
    background-color: #b3b8bf;
  }

  .fr-view {
    padding: 12px 32px;
    font-size: 1.3rem;

  }

  [data-cmd="save"] {
    background-color: #1f7fdf !important;
    position: absolute !important;
    right: 9px;
    padding: 0 8px !important;
    color: #ffffff !important;
    fill: #ffffff !important;
  }
`;

export const EditorHeaderContainer = styled.div`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 32px;
  padding-right: 32px;
  background: #ffffff;
  font-size: 1.8rem;
  line-height: 27px;
  border-radius: 8px 8px 0px 0px;
  color: #66717f;
  font-weight: 600;
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 18px);
    clear: both;
    display: block;
    content: "";
    margin-left: 9px;
    margin-right: 9px;
    background: #efefef;
    height: 1px;
    background-color: #b3b8bf;
  }
`;

export const SaveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background: #1f7fdf;
  border-radius: 8px;
  font-size: 1.6rem;
  position: absolute;
  right: 9px;
  z-index: 50;
  line-height: 16px;
  color: #ffffff;
  cursor: pointer;
`;
