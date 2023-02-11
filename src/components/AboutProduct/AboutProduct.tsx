import styles from "./AboutProduct.module.css";
import { SelfieCouple } from "../../icons/SelfieCouple";
import { ShotIllustration } from "../../icons/Shot.icon";
import { CloudIcon } from "../../icons/Cloud.icon";

export function AboutProduct() {
  return (
    <div className={styles.aboutContent}>
      <div className={styles.cloudWrapper}>
        <CloudIcon />
      </div>

      <div className={styles.topIllustration}>
        <ShotIllustration className={styles.shotIllustration} />
      </div>

      <div className={styles.illustrationWrapper}>
        <SelfieCouple className={styles.illustration} />
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
