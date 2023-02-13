import { ComponentWithChildrenCallback } from "../../types/component.types";
import { ButtonVariant, PrimaryButton } from "../general/Button/Primary/PrimaryButton";
import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { AnimationSetting, AppMediaBreakpoints } from "../../constants/style.constants";
import { gsap, Power3 } from "gsap";
import { MenuIcon } from "../../icons/Menu.icon";
import styles from "./Menu.module.css";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CloseIcon } from "../../icons/Close.icon";

gsap.registerPlugin(ScrollTrigger);

interface MenuProps {
  menuRef: LegacyRef<HTMLDivElement> | MutableRefObject<gsap.core.Timeline | null>;
  toggleMenu: () => void;
}

export function Menu({ children }: ComponentWithChildrenCallback<MenuProps>) {
  const menuRef = useRef<null | HTMLDivElement>(null);
  const [menuVisibility, setMenuVisibility] = useState({ animationState: false, componentState: false });
  const { width } = useWindowSize();

  const toggleMenu = () => {
    setMenuVisibility((prev) => ({ ...prev, animationState: !prev.animationState }));
  };

  const isTabletSize = width <= AppMediaBreakpoints.Tablet;

  useEffect(() => {
    if (menuVisibility.animationState && isTabletSize) {
      gsap.to(menuRef.current, {
        onStart: () => {
          document.documentElement.style.overflowY = "hidden";
          setMenuVisibility((prev) => ({ ...prev, componentState: true }));
        },
        duration: AnimationSetting.Duration,
        opacity: 1,
      });
    }

    if (menuVisibility.componentState) {
      gsap.to(menuRef.current, {
        background: "rgba(255, 255, 255, 0.5)",
        ease: Power3.easeIn,
        scrollTrigger: {
          trigger: document.documentElement,
          start: "88px top",
          end: "128px top",
          scrub: 0.5,
        },
      });
    }

    if (!menuVisibility.animationState && isTabletSize) {
      gsap.to(menuRef.current, {
        onComplete: () => {
          document.documentElement.style.overflowY = "auto";
          setMenuVisibility((prev) => ({ ...prev, componentState: false }));
        },
        duration: AnimationSetting.Duration,
        opacity: 0,
      });
    }
  }, [isTabletSize, menuVisibility.componentState, menuVisibility.animationState]);

  return (
    <>
      {isTabletSize && (
        <PrimaryButton className={styles.menuButton} variant={ButtonVariant.TextPrimary} handleClick={toggleMenu}>
          {menuVisibility.animationState ? <CloseIcon /> : <MenuIcon />}
        </PrimaryButton>
      )}
      {(!isTabletSize || menuVisibility.componentState) && children({ menuRef, toggleMenu })}
    </>
  );
}
