import styles from "./Header.module.css";
import { AppStoreIcon } from "../../../../icons/AppStore.icon";
import { ComponentLayout } from "../../../Layouts/ComponentLayout/ComponentLayout";
import { BoysIllustration } from "../../../../icons/Boys.illustration";
import { GirlIllustration } from "../../../../icons/Girl.illustration";

export function Header() {
  return (
    <ComponentLayout className={styles.layoutOverride}>
      <main>
        <div className={styles.wrapper}>
          <div className={styles.illustration}>
            <GirlIllustration className={styles.illustrationSvg} />
          </div>

          <div className={styles.backIllustration}>
            <BoysIllustration className={styles.backIllustrationSvg} />
          </div>

          <div className={styles.textWrapper}>
            <h1 className={styles.headText}>Your private emotion saved !)</h1>
            <p className={styles.headDescription}>
              FREEZME allows users to freeze photos and videos, revealing them on a specific date of their choosing is a
              unique and exciting concept. By offering personalization, anticipation, and the ability to relive precious
              moments, this application has the potential to become a favorite for those who want to cherish and
              remember their memories in a unique and meaningful way.
            </p>

            <div style={{ marginTop: "40px" }}>
              <a href="https://apps.apple.com/app/freezme/id1661513334" target="_blank" rel="noreferrer">
                <AppStoreIcon />
              </a>
            </div>
          </div>
        </div>
      </main>
    </ComponentLayout>
  );
}
