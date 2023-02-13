import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { ComponentWithChildren } from "../../../types/component.types";
import { ModalLayout } from "../../Layouts/ModalLayout/ModalLayout";
import gsap, { Power3 } from "gsap";
import { AnimationSetting } from "../../../constants/style.constants";
import useOutsideClick from "../../../hooks/useOutsideClick";
import styles from "./Modal.module.css";

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
      document.documentElement.style.overflowY = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
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
  const modalContentRef = useRef(null);
  const modal = useModalProvider();

  const isModalVisible = modal.settings.isShowing && modal.settings.content;

  useEffect(() => {
    if (isModalVisible) {
      gsap.to(modalRef.current, {
        onStart: () => {
          document.documentElement.style.overflowY = "hidden";
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
          document.documentElement.style.overflowY = "auto";
        },
      });
    }
  }, [isModalVisible, showModal]);

  useOutsideClick(modalContentRef, () => {
    modal.provideModalSettings({
      isShowing: false,
    });
  });

  return (
    <ModalContext.Provider value={modal}>
      {showModal && (
        <ModalLayout ref={modalRef}>
          <div ref={modalContentRef} className={styles.modalWrapper}>
            {modal.settings.content}
          </div>
        </ModalLayout>
      )}

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
