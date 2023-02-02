import React, { useEffect, useRef, useState } from "react";
import styles from "./TransitionLayout.module.css";

export function TransitionLayout({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // const onEnter = () => {
  //   gsap.from(wrapperRef.current, 0.6, {
  //     y: 30,
  //     delay: 0.6,
  //     ease: Power3.easeInOut,
  //     opacity: 0,
  //     stagger: {
  //       amount: 0.2,
  //     },
  //   });
  // };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // gsap.to(wrapperRef.current, 0.6, {
      //   y: -30,
      //   ease: Power3.easeInOut,
      // });
    }
  }, [isVisible]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {isVisible && children}
    </div>
  );
}
