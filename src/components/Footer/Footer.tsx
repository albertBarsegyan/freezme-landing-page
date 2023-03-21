import styles from "./Footer.module.css";
import { RoutePath } from "../../constants/route.constants";

import Link from "next/link";
import { MailIcon } from "../../icons/Contact.icon";
import { ContactInformation } from "../../constants/information.constants";
import { FreezMeIcon } from "../../icons/FreezMe.icon";
import { LinksWrapper } from "../LinksWrapper/LinksWrapper";
import { useTranslation } from "next-i18next";
import { LinkButton } from "../general/Button/Link/LinkButton";

export function ContactDetails() {
  return (
    <div>
      {/*<div className={styles.contactInfoItem}>*/}
      {/*  <div className={styles.iconShape}>*/}
      {/*    <PhoneIcon />*/}
      {/*  </div>*/}
      {/*  <span>{ContactInformation.phone}</span>*/}
      {/*</div>*/}

      <div className={styles.contactInfoItem}>
        <div className={styles.iconShape}>
          <MailIcon />
        </div>
        <span>{ContactInformation.email}</span>
      </div>
      {/*<div className={styles.contactInfoItem}>*/}
      {/*  <div className={styles.iconShape}>*/}
      {/*    <TargetIcon />*/}
      {/*  </div>*/}
      {/*  <span>{ContactInformation.place1}</span>*/}
      {/*</div>*/}
    </div>
  );
}

export function Footer() {
  const { t: translation } = useTranslation("common");

  return (
    <div className={styles.footerWrapper}>
      <div>
        <Link href={RoutePath.home()}>
          <FreezMeIcon />
        </Link>

        {/*<SocialMedia />*/}

        <div>
          <p className={styles.copyRight}>
            {translation("copyright-text")} {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <div className={styles.linkContainer}>
        <LinksWrapper forFooter>
          <Link target={"_blank"} href={"static/resource/privacy_policy.html"}>
            <LinkButton isActive={false}>{translation("routes.policy")}</LinkButton>
          </Link>
        </LinksWrapper>
      </div>

      <div>
        <p className={styles.contactTitle}>{translation("routes.contact")}</p>
        <ContactDetails />
      </div>
    </div>
  );
}
