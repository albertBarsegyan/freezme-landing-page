import styles from "./Loader.module.css";
import gsap, { Power3 } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { AnimationSetting } from "../../constants/style.constants";

interface LoaderProps {
  isLoading: boolean;
  children?: React.ReactNode;
  variant?: LoaderVariant;
}

export const enum LoaderVariant {
  Regular = "Regular",
  FullScreen = "FullScreen",
}

export const LoaderIcon = () => {
  return (
    <div className={styles.ldsRingSmallWrapper}>
      <div className={styles.ldsRingSmall}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export function Loader({ children, isLoading, variant = LoaderVariant.Regular }: LoaderProps) {
  const loaderRef = useRef(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const wrapperStyles = classNames({
    [styles.wrapper]: variant === LoaderVariant.Regular,
    [styles.wrapperFullScreen]: variant === LoaderVariant.FullScreen,
  });

  useEffect(() => {
    if (isLoading) {
      gsap.to(loaderRef.current, {
        onStart: () => {
          setIsLoaderVisible(true);
        },
        duration: AnimationSetting.Duration,
        opacity: 1,
        ease: Power3.easeInOut,
      });
    } else {
      gsap.to(loaderRef.current, {
        duration: AnimationSetting.Duration,
        opacity: 0,
        ease: Power3.easeInOut,
        onComplete: () => {
          setIsLoaderVisible(false);
        },
      });
    }

    if (isLoaderVisible && variant === LoaderVariant.FullScreen) {
      document.documentElement.style.overflowY = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isLoaderVisible, isLoading, variant]);

  return (
    <div className={styles.loaderWrapper}>
      {isLoaderVisible && (
        <div ref={loaderRef} className={wrapperStyles}>
          <div className={styles.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
