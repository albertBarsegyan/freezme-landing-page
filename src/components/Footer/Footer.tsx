import styles from "./Footer.module.css";
import { RoutePath } from "../../constants/route.constants";

import Link from "next/link";
import { SocialMedia } from "../SocialMedia/SocialMedia";
import { useTranslation } from "next-i18next";
import { LinkButton } from "../general/Button/Link/LinkButton";
import { useRouter } from "next/router";
import { MailIcon, PhoneIcon, TargetIcon } from "../../icons/Contact.icon";
import { ContactInformation } from "../../constants/information.constants";
import { FreezMeIcon } from "../../icons/FreezMe.icon";

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
          <FreezMeIcon />
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
          <Link href={RoutePath.about()}>
            <LinkButton className={styles.footerLinkButton} isActive={pathname === RoutePath.about()}>
              {translation("routes.about")}
            </LinkButton>
          </Link>

          <Link href={RoutePath.contact()}>
            <LinkButton className={styles.footerLinkButton} isActive={pathname === RoutePath.contact()}>
              {translation("routes.contact")}
            </LinkButton>
          </Link>

          <Link href={RoutePath.contact()}>
            <LinkButton className={styles.footerLinkButton} isActive={pathname === RoutePath.contact()}>
              {translation("routes.policy")}
            </LinkButton>
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
