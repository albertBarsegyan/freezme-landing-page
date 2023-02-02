import { ImageLoader } from "../../ImageLoader/ImageLoader";
import enrollmentImg from "/public/static/img/common/inrollment.png";
import contactedImg from "/public/static/img/common/contacted.jpg";
import { useTranslation } from "next-i18next";
import { PrimaryButton } from "../../general/Button/Primary/PrimaryButton";
import styles from "./Enrollment.module.css";
import { useModal } from "../../contexts/modal/Modal.context";

export function Enrollment() {
  const { t: translation } = useTranslation("common");
  const { provideModalSettings } = useModal();

  const handleModal = () => {
    provideModalSettings({
      isShowing: false,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <ImageLoader src={enrollmentImg} alt={"Enrolled"} />
      </div>
      <div>
        <p className={styles.enrollHeader}>{translation("enrollment-header")}</p>
      </div>
      <div>
        <p className={styles.description}>{translation("enrollment-description")}</p>
      </div>

      <PrimaryButton handleClick={handleModal}>{translation("enrollment-button-text")}</PrimaryButton>
    </div>
  );
}

export function Contacted() {
  const { t: translation } = useTranslation("common");
  const { provideModalSettings } = useModal();

  const handleModal = () => {
    provideModalSettings({
      isShowing: false,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <ImageLoader src={contactedImg} alt={"Enrolled"} />
      </div>
      <div>
        <p className={styles.enrollHeader}>{translation("contacted-header")}</p>
      </div>
      <div>
        <p className={styles.description}>{translation("contacted-description")}</p>
      </div>

      <PrimaryButton handleClick={handleModal}>{translation("contacted-button-text")}</PrimaryButton>
    </div>
  );
}
