import aboutBg from "/public/static/img/about/aboutBg.jpg";
import historyBg from "/public/static/img/about/historyBg.png";
import { useTranslation } from "next-i18next";

import styles from "./History.module.css";
import { ImageLoader } from "../../../ImageLoader/ImageLoader";

export function History() {
  const { t: translation } = useTranslation("about");

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerImageWrapper}>
        <ImageLoader
          unoptimized
          priority
          className={styles.headerImage}
          src={aboutBg}
          alt={translation("about-header-title")}
        />
      </div>

      <div className={styles.historyWrapper}>
        <div className={styles.imageWrapper}>
          <ImageLoader
            className={styles.historyImage}
            width={495}
            src={historyBg}
            alt={translation("about-header-title")}
          />
        </div>

        <div className={styles.historyTextWrapper}>
          <h2 className={styles.historyTitle}>{translation("history-title")}</h2>

          <p className={styles.historyDescription}>{translation("history-description")}</p>
        </div>
      </div>
    </div>
  );
}
