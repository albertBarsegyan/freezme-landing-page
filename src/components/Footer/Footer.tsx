import styles from "./Footer.module.css";
import { RoutePath } from "../../constants/route.constants";
import { GitsIcon } from "../../icons/Gits.icon";
import Link from "next/link";
import { SocialMedia } from "../SocialMedia/SocialMedia";
import { useTranslation } from "next-i18next";
import { LinkButton } from "../general/Button/Link/LinkButton";
import { useRouter } from "next/router";
import { MailIcon, PhoneIcon, TargetIcon } from "../../icons/Contact.icon";
import { ContactInformation } from "../../constants/information.constants";

export function ContactDetails() {
  return (
    <div>
      <div className={styles.contactInfoItem}>
        <div className={styles.iconShape}>
          <PhoneIcon />
        </div>
        <span>{ContactInformation.phone}</span>
      </div>
      <div className={styles.contactInfoItem}>
        <div className={styles.iconShape}>
          <MailIcon />
        </div>
        <span>{ContactInformation.email}</span>
      </div>
      <div className={styles.contactInfoItem}>
        <div className={styles.iconShape}>
          <TargetIcon />
        </div>
        <span>{ContactInformation.place1}</span>
      </div>
      <div className={styles.contactInfoItem}>
        <div className={styles.iconShape}>
          <TargetIcon />
        </div>
        <span>{ContactInformation.place2}</span>
      </div>
    </div>
  );
}

export function Footer() {
  const { t: translation } = useTranslation();
  const { pathname } = useRouter();

  return (
    <div className={styles.footerWrapper}>
      <div>
        <Link href={RoutePath.home()}>
          <GitsIcon width={140} height={40} />
        </Link>

        <SocialMedia />

        <div>
          <p className={styles.copyRight}>
            {translation("copyright-text")} {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <div className={styles.linkContainer}>
        <div className={styles.linkWrapper}>
          <Link href={RoutePath.home()}>
            <LinkButton isActive={pathname === RoutePath.home()}>{translation("routes.home")}</LinkButton>
          </Link>

          <Link href={RoutePath.courses()}>
            <LinkButton isActive={pathname === RoutePath.courses()}>{translation("routes.courses")}</LinkButton>
          </Link>
        </div>

        <div className={styles.linkWrapper}>
          <Link href={RoutePath.about()}>
            <LinkButton isActive={pathname === RoutePath.about()}>{translation("routes.about")}</LinkButton>
          </Link>

          <Link href={RoutePath.contact()}>
            <LinkButton isActive={pathname === RoutePath.contact()}>{translation("routes.contact")}</LinkButton>
          </Link>

          <Link href={RoutePath.projects()}>
            <LinkButton isActive={pathname === RoutePath.projects()}>{translation("routes.projects")}</LinkButton>
          </Link>
        </div>
      </div>

      <div>
        <p className={styles.contactTitle}>{translation("routes.contact")}</p>
        <ContactDetails />
      </div>
    </div>
  );
}
