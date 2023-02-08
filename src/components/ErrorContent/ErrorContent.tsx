import { ErrorIcon } from "../../icons/Error.icon";

import { ButtonVariant, PrimaryButton } from "../general/Button/Primary/PrimaryButton";
import { useTranslation } from "next-i18next";
import styles from "./ErrorContent.module.css";
import { useRouter } from "next/router";

export function ErrorContent() {
  const router = useRouter();
  const { t: translation } = useTranslation("common");

  const handleNavigateHome = () => router.push("/");

  return (
    <div className={styles.errorWrapper}>
      <ErrorIcon className={styles.errorIcon} />
      <h1 className={styles.message}>{translation("error-page-message")}</h1>
      <PrimaryButton
        handleClick={handleNavigateHome}
        className={styles.errorPageButton}
        variant={ButtonVariant.RegularOutline}
      >
        {translation("error-page-button-text")}
      </PrimaryButton>
    </div>
  );
}
