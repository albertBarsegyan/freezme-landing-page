import { ComponentWithChildren } from "../../../types/component.types";
import styles from "./ModalLayout.module.css";
import React, { ForwardedRef, forwardRef } from "react";

export const ModalLayout = forwardRef(({ children }: ComponentWithChildren, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={styles.modalLayoutWrapper} ref={ref}>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
});

ModalLayout.displayName = "ModalLayout";
