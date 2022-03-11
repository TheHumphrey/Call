import styled from "styled-components";

import Select from "react-select";

export const StyledSelect = styled(Select) <{ width?: string, hasRequiredError: boolean, value: string }>`
  width: ${({ width }) => (width ? width : "100%")};

  border-radius: 8px;

  .select__control {
    position: relative !important;
    border-radius: 8px;
    box-shadow: none;
    border: 1px solid ${({ hasRequiredError }) => (hasRequiredError ? "red" : "#B3B8BF")};
  }
  color: #6c757d;

  .select__multi-value {
    border-radius: 8px;

    background-color: ${({ value }) => value && "#e8f3fc"};
  }

  .select__indicator-separator {
    /* display: none; */
  }

  .select__single-value {
    color: #6c757d;
  }

  .select {
    :hover {
      border-radius: 8px;
      background-color: ${({ value }) => value && "#e8f3fc"};
    }
  }

  .css-tj5bde-Svg {
    :hover {
      color: #238fef;
    }
  }
  .select__menu {
    z-index: 10;
    position: absolute;
    top: 40px;
  }
  .select__placeholder {
    font-size: 1.6rem;
  }
  .select__single-value {
    font-size: 1.6rem;
  }
  .select__option {
    font-size: 1.6rem;
  }
  .select__multi-value__label {
    font-size: 1.4rem;
  }
`;
