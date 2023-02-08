import { FreezMeIcon } from "../../icons/FreezMe.icon";
import styles from "./CompanyLogo.module.css";

export function CompanyLogo() {
  return (
    <div className={styles.wrapper}>
      <FreezMeIcon />
      <span className={styles.logoText}>FREEZME</span>
    </div>
  );
}
