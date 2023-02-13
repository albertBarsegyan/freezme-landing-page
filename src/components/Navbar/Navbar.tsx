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

export function Navbar() {
  const { width } = useWindowSize();
  const { pathname, push } = useRouter();
  const [isAboutComponentIntersecting] = useIntersection({
    elementId: RoutePath.about().replace("/", ""),
    options: {
      threshold: 0.5,
    },
  });

  const { t: translation } = useTranslation("common");

  const navbarRef = useRef<null | HTMLDivElement>(null);
  const isTabletSize = width <= AppMediaBreakpoints.Tablet;

  const handleAbout = async () => {
    const scrollToBlock = () => {
      const aboutBlock = document.getElementById(RoutePath.about().replace("/", ""));
      if (aboutBlock) window.scrollTo({ top: aboutBlock.offsetTop - 88, behavior: "smooth" });
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
                  handleAbout();
                }}
                className={styles.linkButton}
                data-text={translation(`routes.about`)}
                isActive={isAboutComponentIntersecting}
              >
                {translation(`routes.about`)}
              </LinkButton>

              <Link onClick={toggleMenu} href={RoutePath.policy()}>
                <LinkButton
                  className={styles.linkButton}
                  data-text={translation(`routes.policy`)}
                  isActive={pathname === RoutePath.policy()}
                >
                  {translation(`routes.policy`)}
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
