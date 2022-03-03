import { Button } from "./style";

type TProps = {
  children: any;
  customType?: "secondary" | "primary" | "ghost";
  icon?: any;
  size?: string;
  light?: boolean;
  disabled?: boolean;
  onClick?: any;
  isSelected?: string;
  value?: string;
}

export const BaseButton = (props: TProps) => {
  const { children, icon, light, disabled, onClick, isSelected, value } = props
  let { customType, size } = props

  if (!customType) customType = "primary"
  if (!size) size = "medium"

  return (
    <Button
      isSelected={isSelected || ''}
      value={value || ''}
      size={size!}
      customType={customType}
      light={light!}
      disabled={disabled!}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {children}
    </Button>
  );
}