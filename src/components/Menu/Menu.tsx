import { ComponentWithChildrenCallback } from "../../types/component.types";
import { PrimaryButton } from "../general/Button/Primary/PrimaryButton";
import { useTranslation } from "next-i18next";
import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { AnimationSetting, AppMediaBreakpoints } from "../../constants/style.constants";
import { gsap } from "gsap";

interface MenuProps {
  menuRef: LegacyRef<HTMLDivElement> | MutableRefObject<gsap.core.Timeline | null>;
}

export function Menu({ children }: ComponentWithChildrenCallback<MenuProps>) {
  const menuRef = useRef<null | gsap.core.Timeline>(null);
  const [menuVisibility, setMenuVisibility] = useState({ animationState: false, componentState: false });
  const { t: translate } = useTranslation("common");
  const { width } = useWindowSize();

  const toggleMenu = () => {
    setMenuVisibility((prev) => ({ ...prev, animationState: !prev.animationState }));
  };

  const isTabletSize = width <= AppMediaBreakpoints.Tablet;

  const menuButtonText = translate(
    menuVisibility.componentState ? "menu-button-title-is-open" : "menu-button-title-is-closed"
  );

  useEffect(() => {
    if (menuVisibility.componentState) {
      document.body.style.overflowY = "hidden";
    }

    if (menuVisibility.animationState && isTabletSize) {
      gsap.to(menuRef.current, {
        onStart: () => {
          setMenuVisibility((prev) => ({ ...prev, componentState: true }));
        },
        duration: AnimationSetting.Duration,
        top: 76,
        opacity: 1,
      });
    }

    if (!menuVisibility.animationState && isTabletSize) {
      gsap.to(menuRef.current, {
        onComplete: () => {
          setMenuVisibility((prev) => ({ ...prev, componentState: false }));
        },
        duration: AnimationSetting.Duration,
        top: 176,
        opacity: 0,
        transform: "translateY(0)",
      });
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isTabletSize, menuVisibility.componentState, menuVisibility.animationState]);

  return (
    <div>
      <>
        {isTabletSize && <PrimaryButton handleClick={toggleMenu}>{menuButtonText}</PrimaryButton>}
        {(!isTabletSize || menuVisibility.componentState) && children({ menuRef })}
      </>
    </div>
  );
}
