import { ContactForm } from "../../../../forms/ContactForm/ContactForm";
import styles from "./ContactInfo.module.css";
import { useTranslation } from "next-i18next";
import { ContactDetails } from "../../../Footer/Footer";

export function ContactInfo() {
  const { t: translation } = useTranslation("contact");
  return (
    <div className={styles.wrapper}>
      <div className={styles.mapWrapper}>
        <div className={styles.contactInfoWrapper}>
          <p style={{ marginBottom: "8px" }}>{translation("contact-info.working-days")}</p>
          <ContactDetails />
        </div>
      </div>
      <div className={styles.formWrapper}>
        <ContactForm />
      </div>
    </div>
  );
}
