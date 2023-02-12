import styles from "./Accordion.module.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowIconDown } from "../../icons/Arrow.icon";

export function Accordion({ question, answer }: { question: string; answer: string }) {
  const contentRef = useRef(null);
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState({ animationState: false, componentState: false });

  const handleToggle = () => setIsOpen((prev) => ({ ...prev, animationState: !prev.animationState }));

  useEffect(() => {
    if (isOpen.animationState) {
      gsap.to(contentRef.current, {
        duration: 0.2,
        height: "auto",
        onStart: () => {
          gsap.to(arrowRef.current, {
            duration: 0.2,
            rotate: "180deg",
          });

          setIsOpen((prev) => ({ ...prev, componentState: true }));
        },
      });
    } else {
      gsap.to(arrowRef.current, {
        duration: 0.2,
        rotate: "0",
      });

      gsap.to(contentRef.current, {
        duration: 0.2,
        height: 0,
        onComplete: () => {
          setIsOpen((prev) => ({ ...prev, componentState: false }));
        },
      });
    }
  }, [isOpen.animationState, isOpen.componentState]);

  return (
    <div className={styles.accordionContainer}>
      <div className={styles.questionWrapper}>
        <button onClick={handleToggle} type="button" className={styles.accordionQuestion}>
          {question}
        </button>
        <div ref={arrowRef}>
          <ArrowIconDown />
        </div>
      </div>

      {isOpen.componentState && (
        <p ref={contentRef} style={{ height: 0 }} className={styles.accordionAnswer}>
          {answer}
        </p>
      )}
    </div>
  );
}
