import React from "react";
import { Option } from "./style";

interface Props {
  children: any,
  value: any,
  selected: any,
  disabled: any,
  defaultValue: any
}

function _Option({ children, value, selected, disabled, defaultValue }: Props) {
  return (
    <Option value={value} selected={selected} disabled={disabled} defaultValue={defaultValue}>
      {children}
    </Option>
  );
}

export default _Option;
