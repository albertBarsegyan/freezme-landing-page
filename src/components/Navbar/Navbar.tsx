import styles from "./Navbar.module.css";

import { RoutePath } from "../../constants/route.constants";
import { useTranslation } from "next-i18next";
import { LinkButton } from "../general/Button/Link/LinkButton";
import { useRouter } from "next/router";
import { Menu } from "../Menu/Menu";
import { LegacyRef, useEffect, useRef } from "react";
import { CompanyLogo } from "../CompanyLogo/CompanyLogo";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { LinksWrapper } from "../LinksWrapper/LinksWrapper";
import { useMenu } from "../contexts/menu/Menu.context";
import { AppMediaBreakpoints } from "../../constants/style.constants";

gsap.registerPlugin(ScrollTrigger);

export const intersectionOptions = {
  options: {
    threshold: 0.5,
  },
};

export function Navbar() {
  const { closeMenu } = useMenu();
  const { pathname, push } = useRouter();
  const isTabletSize = pathname <= AppMediaBreakpoints.Tablet;

  const { t: translation } = useTranslation("common");

  const navbarRef = useRef<null | HTMLDivElement>(null);

  const handleLogo = () => {
    if (isTabletSize) closeMenu();
    const scrollToTop = async () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    if (pathname !== RoutePath.home()) {
      push(RoutePath.home()).then(scrollToTop);
      return;
    }

    scrollToTop().then(() => {
      setTimeout(() => {
        push(RoutePath.home());
      }, 500);
    });
  };

  useEffect(() => {
    gsap.to(navbarRef.current, {
      background: "rgba(255, 255, 255, 0.5)",
      duration: 0.3,
      opacity: 1,
      ease: Power3.easeIn,
      scrollTrigger: {
        trigger: navbarRef.current,
        start: "top 40px",
        scrub: 0.5,
      },
    });
  }, [pathname]);

  return (
    <div ref={navbarRef} className={styles.wrapper}>
      <LinkButton isActive handleClick={handleLogo}>
        <CompanyLogo />
      </LinkButton>

      <Menu>
        {({ menuRef }) => (
          <div ref={menuRef as LegacyRef<HTMLDivElement>} className={styles.menuWrapper}>
            <LinksWrapper />

            <div className={styles.menuCopyright}>
              <p>{translation("copyright-text")}</p>
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}
