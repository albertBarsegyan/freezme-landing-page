import { GitsIcon } from "../../icons/Gits.icon";
import styles from "./Navbar.module.css";
import Link from "next/link";

import { RoutePath } from "../../constants/route.constants";
import { useTranslation } from "next-i18next";
import { LinkButton } from "../general/Button/Link/LinkButton";
import { useRouter } from "next/router";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Menu } from "../Menu/Menu";
import { Donation } from "../Donation/Donation";
import { LegacyRef } from "react";
import { AppMediaBreakpoints } from "../../constants/style.constants";

const NavbarNavigations = [
  { nameId: "home", path: RoutePath.home() },
  { nameId: "courses", path: RoutePath.courses() },
  { nameId: "about", path: RoutePath.about() },
  { nameId: "projects", path: RoutePath.projects() },
  { nameId: "contact", path: RoutePath.contact() },
];

export function Navbar() {
  const { pathname } = useRouter();
  const { t: translation } = useTranslation("common");
  const { width } = useWindowSize();

  const isTabletSize = width <= AppMediaBreakpoints.Tablet;

  return (
    <div className={styles.wrapper}>
      <Link href={RoutePath.home()}>
        <GitsIcon width={isTabletSize ? 120 : 140} height={40} />
      </Link>

      <Menu>
        {({ menuRef }) => (
          <div ref={menuRef as LegacyRef<HTMLDivElement>} className={styles.menuWrapper}>
            <div className={styles.linksWrapper}>
              {NavbarNavigations.map((navigation) => (
                <Link className={styles.linkItem} key={navigation.nameId} href={navigation.path}>
                  <LinkButton
                    data-text={translation(`routes.${navigation.nameId}`)}
                    isActive={pathname === navigation.path}
                  >
                    {translation(`routes.${navigation.nameId}`)}
                  </LinkButton>
                </Link>
              ))}
            </div>

            <div className={styles.buttonsWrapper}>
              {/*<LanguageSelector />*/}
              <Donation />
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}
