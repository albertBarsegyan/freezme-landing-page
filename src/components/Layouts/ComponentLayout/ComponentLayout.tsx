import { ReactNode } from "react";
import styles from "./ComponentLayout.module.css";
import classNames from "classnames";

export function ComponentLayout({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const wrapperStyles = classNames({
    [className ?? ""]: Boolean(className),
    [styles.componentWrapper]: true,
  });

  return (
    <div className={wrapperStyles} id={id}>
      {children}
    </div>
  );
}
