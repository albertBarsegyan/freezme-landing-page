import styles from "./Navbar.module.css";
import Link from "next/link";

import { RoutePath } from "../../constants/route.constants";
import { useTranslation } from "next-i18next";
import { LinkButton } from "../general/Button/Link/LinkButton";
import { useRouter } from "next/router";
import { Menu } from "../Menu/Menu";
import { LegacyRef, useLayoutEffect, useRef } from "react";
import { CompanyLogo } from "../CompanyLogo/CompanyLogo";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NavbarNavigations = [
  { nameId: "about", path: `#about` },
  { nameId: "policy", path: RoutePath.policy() },
];

export function Navbar() {
  const { pathname } = useRouter();
  const { t: translation } = useTranslation("common");

  const navbarRef = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.to(navbarRef.current, {
      background: "rgba(255, 255, 255, 0.5)",
      duration: 0.3,
      ease: Power3.easeIn,
      scrollTrigger: {
        trigger: navbarRef.current,
        start: "top 40px",
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <div ref={navbarRef} className={styles.wrapper}>
      <Link href={RoutePath.home()}>
        <CompanyLogo />
      </Link>

      <Menu>
        {({ menuRef }) => (
          <div ref={menuRef as LegacyRef<HTMLDivElement>} className={styles.menuWrapper}>
            <div className={styles.linksWrapper}>
              {NavbarNavigations.map((navigation) => (
                <Link className={styles.linkItem} key={navigation.nameId} href={navigation.path}>
                  <LinkButton
                    className={styles.linkButton}
                    data-text={translation(`routes.${navigation.nameId}`)}
                    isActive={pathname === navigation.path}
                  >
                    {translation(`routes.${navigation.nameId}`)}
                  </LinkButton>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}
