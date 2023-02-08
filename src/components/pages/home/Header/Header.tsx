import styles from "./Header.module.css";
import { AppStoreIcon } from "../../../../icons/AppStore.icon";

export function Header() {
  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.textWrapper}>
          <h1 className={styles.headText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
          <p className={styles.headDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis
          </p>

          <div style={{ marginTop: "40px" }}>
            <a href={"www.google.com"}>
              <AppStoreIcon />
            </a>
          </div>
        </div>

        {/*<div>*/}
        {/*  <AppStoreIcon />*/}
        {/*</div>*/}
      </div>
    </main>
  );
}
