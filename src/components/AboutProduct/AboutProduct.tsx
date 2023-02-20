import styles from "./AboutProduct.module.css";
import { SelfieCouple } from "../../icons/SelfieCouple";
import { ShotIllustration } from "../../icons/Shot.icon";
import { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";
import { CloudIcon } from "../../icons/Cloud.icon";
import { RoutePath } from "../../constants/route.constants";

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
    <div id={RoutePath.about().replace("/", "")}>
      <div className={styles.aboutContent}>
        <div className={styles.cloudWrapper}>
          <CloudIcon />
        </div>

        <div className={styles.cloudWrapper} style={{ marginTop: "80px" }}>
          <CloudIcon x={400} />
        </div>

        <div className={styles.topIllustration}>
          <ShotIllustration className={styles.shotIllustration} />
        </div>

        <div className={styles.illustrationWrapper}>
          <SelfieCouple className={styles.illustration} />
        </div>

        <div className={styles.headerWrapper}>
          <p ref={headerRef} className={styles.aboutHeader}>
            About
          </p>
        </div>

        <div className={styles.wrapper}>
          <p className={styles.description}>
            <strong>FREEZME</strong> is a unique application that allows you to freeze photos and videos, revealing them
            at a specific date chosen by the user. The application is designed to be user-friendly and straightforward.
            After downloading the application, the user simply takes photos and videos, which are then stored in a
            digital
            {"freezer"}. The user can choose the date when they want their photos and videos to be revealed, and the
            application automatically stores and locks the media in the freezer until that date arrives. Once the
            designated date arrives, the application will automatically thaw the photos and videos, allowing the user to
            relive their memories and emotions. The user can choose to receive notifications when their photos and
            videos are ready to be viewed, creating a sense of anticipation and excitement as they wait for the big
            reveal.
          </p>
        </div>
      </div>
    </div>
  );
}
