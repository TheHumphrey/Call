import React from "react"
import { Container, Input, Label } from "./style"

interface Props {
  checked?: any,
  onChange?: any,
  label?: any,
  className?: any,
  [attribute: string]: any
}

export const CheckBox = ({ checked, onChange, label, className, ...props }: Props) => {
  return (
    <Container className={className}>
      <Input type="checkbox" checked={checked} onChange={onChange} {...props} />
      <Label>{label}</Label>
    </Container>
  );
}
