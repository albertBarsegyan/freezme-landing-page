import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { ComponentWithChildren } from "../../../types/component.types";

interface MenuState {
  animationState: boolean;
  componentState: boolean;
}

interface MenuContext {
  menuVisibility: { animationState: boolean; componentState: boolean };
  setMenuVisibility: Dispatch<SetStateAction<MenuState>>;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const MenuInitialState = { animationState: false, componentState: false };

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

export default function MenuProvider({ children }: ComponentWithChildren) {
  const [menuVisibility, setMenuVisibility] = useState(MenuInitialState);

  const toggleMenu = () => {
    setMenuVisibility((prev) => ({ ...prev, animationState: !prev.animationState }));
  };

  const closeMenu = () => {
    setMenuVisibility((prev) => ({ ...prev, animationState: false }));
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
