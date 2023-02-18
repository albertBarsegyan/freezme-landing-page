import React from "react";
import classNames from "classnames";
import styles from "./LinkButton.module.css";

interface LinkButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
  handleClick?: () => void;
}

export function LinkButton({ children, handleClick, isActive, className }: LinkButtonProps) {
  const buttonStyles = classNames({
    [className ?? ""]: Boolean(className),
    [styles.linkButton]: true,
    [styles.linkButtonActive]: isActive,
  });

  return (
    <button type="button" onClick={handleClick} className={buttonStyles}>
      {children}
    </button>
  );
}
