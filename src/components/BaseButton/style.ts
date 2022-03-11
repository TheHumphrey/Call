import styled from 'styled-components'

const background = { ghost: "#E5E7EA", secondary: "none", primary: "#1F7FDF" };
const backgroundSmall = { ghost: "none", secondary: "none", primary: "#1F7FDF" };

type TButtonProps = {
  customType: "secondary" | "primary" | "ghost";
  size: string;
  light: boolean;
  disabled: boolean;
  isSelected: string;
  value: string;
}

export const Button = styled.button<TButtonProps>`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: ${getPadding};
  height: ${getHeight};
  background: ${({ customType, size }) => (size === "small" ? backgroundSmall[customType || 'primary'] : background[customType || 'primary'])};
  background: ${({ disabled }) => disabled && "#E5E7EA"};
  background-color: ${({ isSelected, value }) => isSelected === value ? "#1F7FDF" : "#E5E7EA"};

  outline: none;
  border: 1px solid;
  border-color: ${({ customType, size }) =>
    size === "small" && customType === "ghost" ? "#B3B8BF" : "transparent"};
  border-radius: 8px;
  font-style: normal;
  font-weight: normal;
  font-family: 'Roboto';
  font-size: ${getFontSize};
  line-height: 16px;
  color: ${getColor};
  color: ${({ isSelected, value, disabled }) => isSelected ? (isSelected === value ? "white" : "#66717F") : `${disabled && "#B3B8BF"}`};
  
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: ${({ value }) => value ? '18px' : '0px'};

  :hover {
    cursor: ${({ disabled }) => !disabled && "pointer"};
    border-color: ${({ customType, size, disabled }) =>
    !disabled && size === "small" && customType === "ghost" ? "#238FEF" : "transparent"};
    background: ${({ disabled }) => !disabled && getBackgroundHover};
    background-color: ${({ isSelected, value }) => isSelected === value ? "#1F7FDF" : "#E5E7EA"};
    color: ${({ isSelected, value, disabled }) => isSelected ? (isSelected === value ? "white" : "#66717F") : `${!disabled && getColorHover}`};
  }

  span {
    margin: 3px 9px 0 0;
  }
`

function getHeight({ size, customType }: TButtonProps) {
  if (size === "large") {
    if (customType === "secondary") {
      return "30px";
    }
    return "40px";
  } else if (size === "small") {
    return "30px";
  } else {
    return "32px";
  }
}

function getPadding({ size }: TButtonProps) {
  if (size === "large") {
    return "16px";
  } else if (size === "small") {
    return "8px";
  } else {
    return "8px 16px";
  }
}

function getColor({ size, customType, light }: TButtonProps) {
  if (customType === "ghost") {
    if (size === "small") {
      return "#B3B8BF";
    } else {
      return "#66717F";
    }
  } else if (customType === "secondary") {
    if (light) {
      return "#B3B8BF";
    }
    return "#66717F";
  }
  return "#FAFAFA";
}

function getBackgroundHover({ size, customType }: TButtonProps) {
  if ((customType === "ghost" && size === "small") || customType === "secondary") {
    return "transparent";
  }
  return "#238FEF";
}

function getColorHover({ size, customType }: TButtonProps) {
  if (customType === "ghost" && size === "small") {
    return "#238FEF";
  } else if (customType === "secondary") {
    return "#238FEF";
  }
  return "#FAFAFA";
}

function getFontSize({ size, customType }: TButtonProps) {
  if (customType === "secondary" && size === "small") {
    return "12px";
  } else if (customType === "secondary" && size === "medium") {
    return "14px";
  }
  return "16px";
}