import styles from "./Navbar.module.css";
import Link from "next/link";

import { RoutePath } from "../../constants/route.constants";
import { useTranslation } from "next-i18next";
import { LinkButton } from "../general/Button/Link/LinkButton";
import { useRouter } from "next/router";
import { Menu } from "../Menu/Menu";
import { LegacyRef, useEffect, useRef } from "react";
import { CompanyLogo } from "../CompanyLogo/CompanyLogo";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useIntersection } from "../../hooks/useIntersectionObserver";
import { CloudIcon } from "../../icons/Cloud.icon";
import { AppMediaBreakpoints } from "../../constants/style.constants";
import { useWindowSize } from "../../hooks/useWindowSize";

gsap.registerPlugin(ScrollTrigger);

const intersectionOptions = {
  options: {
    threshold: 0.5,
  },
};

export function Navbar() {
  const { width } = useWindowSize();
  const { pathname, push } = useRouter();
  const [isAboutComponentIntersecting] = useIntersection({
    elementId: RoutePath.about().replace("/", ""),
    ...intersectionOptions,
  });
  const [isFaqComponentIntersecting] = useIntersection({
    elementId: RoutePath.faq().replace("/", ""),
    ...intersectionOptions,
  });
  const [isFeaturesComponentIntersecting] = useIntersection({
    elementId: RoutePath.features().replace("/", ""),
    ...intersectionOptions,
  });

  const { t: translation } = useTranslation("common");

  const navbarRef = useRef<null | HTMLDivElement>(null);
  const isTabletSize = width <= AppMediaBreakpoints.Tablet;

  const handleScrollNavigation = (routeToNavigate: string) => async () => {
    const scrollToBlock = () => {
      const componentBlock = document.getElementById(routeToNavigate.replace("/", ""));
      if (componentBlock) window.scrollTo({ top: componentBlock.offsetTop - 108, behavior: "smooth" });
    };

    if (pathname !== RoutePath.home()) {
      await push(RoutePath.home());
      await scrollToBlock();
      return;
    }

    scrollToBlock();
  };

  const handleLogo = () => {
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
      <LinkButton isActive handleClick={handleLogo}>
        <CompanyLogo />
      </LinkButton>

      <Menu>
        {({ menuRef, toggleMenu }) => (
          <div ref={menuRef as LegacyRef<HTMLDivElement>} className={styles.menuWrapper}>
            {isTabletSize && (
              <div className={styles.cloudWrapperFirst}>
                <CloudIcon />
              </div>
            )}

            <div className={styles.linksWrapper}>
              <LinkButton
                handleClick={() => {
                  toggleMenu();
                  handleScrollNavigation(RoutePath.features())();
                }}
                className={styles.linkButton}
                isActive={isFeaturesComponentIntersecting}
              >
                {translation(`routes.features`)}
              </LinkButton>

              <LinkButton
                handleClick={() => {
                  toggleMenu();
                  handleScrollNavigation(RoutePath.about())();
                }}
                className={styles.linkButton}
                data-text={translation(`routes.about`)}
                isActive={isAboutComponentIntersecting}
              >
                {translation(`routes.about`)}
              </LinkButton>

              <LinkButton
                handleClick={() => {
                  toggleMenu();
                  handleScrollNavigation(RoutePath.faq())();
                }}
                className={styles.linkButton}
                isActive={isFaqComponentIntersecting}
              >
                {translation(`routes.faq`)}
              </LinkButton>

              <Link onClick={toggleMenu} href={RoutePath.terms()}>
                <LinkButton className={styles.linkButton} isActive={pathname === RoutePath.terms()}>
                  {translation(`routes.terms`)}
                </LinkButton>
              </Link>
            </div>

            <div className={styles.menuCopyright}>
              <p>{translation("copyright-text")}</p>
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}
