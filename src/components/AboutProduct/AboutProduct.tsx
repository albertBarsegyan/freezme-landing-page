import styles from "./AboutProduct.module.css";
import { SelfieCouple } from "../../icons/SelfieCouple";
import { ShotIllustration } from "../../icons/Shot.icon";
import { CloudIcon } from "../../icons/Cloud.icon";
import { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";

export function AboutProduct() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.to(headerRef.current, {
      duration: 2,
      yoyo: true,
      y: "-300px",
      repeat: Infinity,
      ease: Power2.easeInOut,
    });
  }, []);

  return (
    <div className={styles.aboutContent} id={"about"}>
      <div className={styles.cloudWrapper}>
        <CloudIcon />
      </div>

      <div className={styles.topIllustration}>
        <ShotIllustration className={styles.shotIllustration} />
      </div>

      <div className={styles.illustrationWrapper}>
        <SelfieCouple className={styles.illustration} />
      </div>

      <div className={styles.headerWrapper}>
        <p ref={headerRef} className={styles.aboutHeader}>
          Story
        </p>
        {/*<ArrowIconDownBig />*/}
      </div>

      <div className={styles.wrapper}>
        <p className={styles.description}>
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  );
}
