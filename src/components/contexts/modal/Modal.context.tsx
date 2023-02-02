import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { ComponentWithChildren } from "../../../types/component.types";
import { ModalLayout } from "../../Layouts/ModalLayout/ModalLayout";
import gsap, { Power3 } from "gsap";
import { AnimationSetting } from "../../../constants/style.constants";

interface ModalStateSettings {
  isShowing: boolean;
  content?: string | React.ReactNode;
}

interface ModalContext {
  settings: ModalStateSettings;
  provideModalSettings: (changedSettings: ModalStateSettings) => void;
}

const ModalContext = createContext<ModalContext>({
  settings: { isShowing: false, content: "" },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  provideModalSettings: () => {},
});

function useModalProvider() {
  const [settings, setSettings] = useState<ModalStateSettings>({ isShowing: false, content: "" });

  function provideModalSettings(changedSettings?: ModalStateSettings) {
    setSettings((prevState) => {
      return {
        ...prevState,
        ...changedSettings,
      };
    });
  }

  useEffect(() => {
    if (settings.isShowing) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [settings.isShowing]);

  return {
    provideModalSettings,
    settings,
  };
}

export default function ModalProvider({ children }: ComponentWithChildren) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const modal = useModalProvider();

  const isModalVisible = modal.settings.isShowing && modal.settings.content;

  useEffect(() => {
    if (isModalVisible) {
      gsap.to(modalRef.current, {
        onStart: () => {
          setShowModal(true);
        },
        duration: AnimationSetting.Duration,
        opacity: 1,
        ease: Power3.easeInOut,
      });
    } else {
      gsap.to(modalRef.current, {
        duration: AnimationSetting.Duration,
        opacity: 0,
        ease: Power3.easeInOut,
        onComplete: () => {
          setShowModal(false);
        },
      });
    }
  }, [isModalVisible, showModal]);

  return (
    <ModalContext.Provider value={modal}>
      {showModal && <ModalLayout ref={modalRef}>{modal.settings.content}</ModalLayout>}
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
