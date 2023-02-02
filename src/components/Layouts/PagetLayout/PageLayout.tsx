import { ComponentWithChildren } from "../../../types/component.types";
import { Navbar } from "../../Navbar/Navbar";
import { Footer } from "../../Footer/Footer";
import styles from "./PageLayout.module.css";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { gsap, Power3 } from "gsap";

interface PageLayoutProps extends ComponentWithChildren {
  hasPadding?: boolean;
}

export function PageLayout({ children, hasPadding = true }: PageLayoutProps) {
  const pageRef = useRef(null);
  const wrapperStyles = classNames({
    [styles.pageContent]: hasPadding,
    [styles.pageContentWithoutPadding]: !hasPadding,
  });

  useEffect(() => {
    gsap.to(pageRef.current, 0.3, {
      opacity: 1,
      ease: Power3.easeIn,
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <div ref={pageRef} style={{ opacity: 0 }} className={wrapperStyles}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
