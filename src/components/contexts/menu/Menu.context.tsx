import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { ComponentWithChildren } from "../../../types/component.types";

export const enum MenuAnimationState {
  Idle = "Idle",
  Start = "Start",
  End = "End",
}

interface MenuState {
  animationState: MenuAnimationState;
  componentState: boolean;
}

interface MenuContext {
  menuVisibility: { animationState: MenuAnimationState; componentState: boolean };
  setMenuVisibility: Dispatch<SetStateAction<MenuState>>;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const MenuInitialState = { animationState: MenuAnimationState.Idle, componentState: false };

const MenuContext = createContext<MenuContext>({
  menuVisibility: MenuInitialState,
  setMenuVisibility: () => {
    return;
  },
  toggleMenu: () => {
    return;
  },
  closeMenu: () => {
    return;
  },
});

const toggleState = (animationState: MenuAnimationState) => {
  return animationState === MenuAnimationState.Start ? MenuAnimationState.End : MenuAnimationState.Start;
};

export default function MenuProvider({ children }: ComponentWithChildren) {
  const [menuVisibility, setMenuVisibility] = useState<typeof MenuInitialState>(MenuInitialState);

  const toggleMenu = () => {
    setMenuVisibility((prev) => ({ ...prev, animationState: toggleState(prev.animationState) }));
  };

  const closeMenu = () => {
    setMenuVisibility((prev) => ({ ...prev, animationState: MenuAnimationState.End }));
  };

  return (
    <MenuContext.Provider value={{ menuVisibility, setMenuVisibility, toggleMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
}
