import { ComponentWithChildren } from "../../../../types/component.types";
import styles from "./PrimaryButton.module.css";
import classNames from "classnames";
import { CSSProperties } from "react";

export const enum ButtonVariant {
  Regular = "regular",
  TextPrimary = "textPrimary",
  TextSecondary = "textSecondary",
  RegularOutline = "regularOutline",
}

interface PrimaryButtonProps extends ComponentWithChildren {
  handleClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  variant?: ButtonVariant;
  active?: boolean;
  style?: CSSProperties;
}

export function PrimaryButton({
  children,
  handleClick,
  className,
  active = true,
  variant = ButtonVariant.Regular,
  type = "button",
  style,
}: PrimaryButtonProps) {
  const buttonStyles = classNames({
    [styles[`${variant}Button`]]: active,
    [styles[`${variant}ButtonDisabled`]]: !active,
    [className ?? ""]: Boolean(className),
  });

  return (
    <button type={type} style={style} onClick={handleClick} className={buttonStyles}>
      {children}
    </button>
  );
}
