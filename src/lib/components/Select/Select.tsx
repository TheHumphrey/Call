import React from "react";
import { StyledSelect } from "./style";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface Props {
  value?: any,
  disabled?: any,
  isMulti?: any,
  options?: any,
  placeholder?: any,
  hasRequiredError?: any,
  onChange?: any,
  width?: any,
  className?: any
}

const ref = React.createRef();
export const Select = React.forwardRef(({
  value,
  disabled,
  isMulti,
  options,
  placeholder,
  hasRequiredError,
  width,
  className,
  ...props
}: Props, red) => {
  return (
    <StyledSelect
      classNamePrefix="select"
      placeholder={placeholder}
      options={options}
      value={value}
      isDisabled={disabled}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      components={animatedComponents}
      hasRequiredError={hasRequiredError}
      {...props}
    />
  );
});
