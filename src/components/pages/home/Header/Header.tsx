import { useTranslation } from "next-i18next";
import { ButtonVariant, PrimaryButton } from "../../../general/Button/Primary/PrimaryButton";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { RoutePath } from "../../../../constants/route.constants";
import { ImageLoader } from "../../../ImageLoader/ImageLoader";

export function Header() {
  const { t: translation } = useTranslation("home");
  const router = useRouter();

  const navigateToCourses = () => router.push(RoutePath.courses());

  return (
    <main>
      <div className={styles.headerWrapper}>
        <div className={styles.headerTextWrapper}>
          <h1 className={styles.header}>{translation("header-title")}</h1>
          <p className={styles.description}>{translation("header-description")}</p>

          <PrimaryButton handleClick={navigateToCourses} variant={ButtonVariant.RegularOutline}>
            {translation("hero-button-title")}
          </PrimaryButton>
        </div>

        <div className={styles.imageWrapper}>
          <ImageLoader
            className={styles.image}
            src={"/static/img/home/heroBg.jpg"}
            alt={"Gyumri information technologies center"}
          />
        </div>
      </div>
    </main>
  );
}
