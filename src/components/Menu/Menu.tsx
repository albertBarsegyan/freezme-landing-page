/* eslint-disable */
import { ComponentWithChildrenCallback } from "../../types/component.types";
import { ButtonVariant, PrimaryButton } from "../general/Button/Primary/PrimaryButton";
import React, { LegacyRef, MutableRefObject, useEffect, useRef } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { AnimationSetting, AppMediaBreakpoints } from "../../constants/style.constants";
import { gsap } from "gsap";
import { MenuIcon } from "../../icons/Menu.icon";
import styles from "./Menu.module.css";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CloseIcon } from "../../icons/Close.icon";
import { MenuAnimationState, useMenu } from "../contexts/menu/Menu.context";

gsap.registerPlugin(ScrollTrigger);

interface MenuProps {
  menuRef: LegacyRef<HTMLDivElement> | MutableRefObject<gsap.core.Timeline | null>;
}

export function Menu({ children }: ComponentWithChildrenCallback<MenuProps>) {
  const menuRef = useRef<null | HTMLDivElement>(null);
  const {
    menuVisibility: { animationState, componentState },
    setMenuVisibility,
    toggleMenu,
  } = useMenu();
  const { width } = useWindowSize();

  const isTabletSize = width <= AppMediaBreakpoints.Tablet;

  console.log({ animation: animationState });

  useEffect(() => {
    if (isTabletSize) {
      if (animationState===MenuAnimationState.Start) {
        gsap.to(menuRef.current, {
          onStart: () => {
            document.documentElement.style.overflowY = "hidden";
            setMenuVisibility((prev) => ({ ...prev, componentState: true }));
          },
          duration: AnimationSetting.Duration,
          opacity: 1,
        });
      }

      if (animationState===MenuAnimationState.End) {
        gsap.to(menuRef.current, {
          onComplete: () => {
            document.documentElement.style.overflowY = "auto";
            setMenuVisibility((prev) => ({ ...prev, componentState: false, animationState: MenuAnimationState.Idle }));
          },
          duration: AnimationSetting.Duration,
          opacity: 0,
        });
      }
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isTabletSize, animationState]);

  // useEffect(() => {
  //   setMenuVisibility(MenuInitialState);
  // }, [pathname]);

  return (
    <>
      {isTabletSize && (
        <PrimaryButton className={styles.menuButton} variant={ButtonVariant.TextPrimary} handleClick={toggleMenu}>
          {animationState===MenuAnimationState.Start ? <CloseIcon/>:<MenuIcon/>}
        </PrimaryButton>
      )}
      {(!isTabletSize || componentState) && children({ menuRef })}
    </>
  );
}
