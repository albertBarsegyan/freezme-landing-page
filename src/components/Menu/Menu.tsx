import { ComponentWithChildrenCallback } from "../../types/component.types";
import { ButtonVariant, PrimaryButton } from "../general/Button/Primary/PrimaryButton";
import React, { LegacyRef, MutableRefObject, useLayoutEffect, useRef, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { AnimationSetting, AppMediaBreakpoints } from "../../constants/style.constants";
import { gsap, Power3 } from "gsap";
import { MenuIcon } from "../../icons/Menu.icon";
import styles from "./Menu.module.css";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MenuProps {
  menuRef: LegacyRef<HTMLDivElement> | MutableRefObject<gsap.core.Timeline | null>;
}

export function Menu({ children }: ComponentWithChildrenCallback<MenuProps>) {
  const menuRef = useRef<null | HTMLDivElement>(null);
  const [menuVisibility, setMenuVisibility] = useState({ animationState: false, componentState: false });
  const { width } = useWindowSize();

  const toggleMenu = () => {
    setMenuVisibility((prev) => ({ ...prev, animationState: !prev.animationState }));
  };

  const isTabletSize = width <= AppMediaBreakpoints.Tablet;

  useLayoutEffect(() => {
    if (menuVisibility.componentState) {
      document.body.style.overflow = "hidden";
    }

    if (menuVisibility.animationState && isTabletSize) {
      gsap.to(menuRef.current, {
        onStart: () => {
          setMenuVisibility((prev) => ({ ...prev, componentState: true }));
        },
        duration: AnimationSetting.Duration,
        right: "0",
        opacity: 1,
      });
    }

    if (menuVisibility.componentState) {
      gsap.to(menuRef.current, {
        background: "rgba(255, 255, 255, 0.5)",
        ease: Power3.easeIn,
        scrollTrigger: {
          trigger: document.body,
          start: "88px top",
          end: "128px top",
          scrub: 0.5,
        },
      });
    }

    if (!menuVisibility.animationState && isTabletSize) {
      gsap.to(menuRef.current, {
        onComplete: () => {
          setMenuVisibility((prev) => ({ ...prev, componentState: false }));
        },
        duration: AnimationSetting.Duration,
        right: "-100%",
        opacity: 0,
        transform: "translateY(0)",
      });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isTabletSize, menuVisibility.componentState, menuVisibility.animationState]);

  return (
    <div>
      <>
        {isTabletSize && (
          <PrimaryButton className={styles.menuButton} variant={ButtonVariant.TextPrimary} handleClick={toggleMenu}>
            <MenuIcon />
          </PrimaryButton>
        )}
        {(!isTabletSize || menuVisibility.componentState) && children({ menuRef })}
      </>
    </div>
  );
}
