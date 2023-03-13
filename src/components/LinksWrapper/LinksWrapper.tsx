import styles from "./LinkWrapper.module.css";
import { LinkButton } from "../general/Button/Link/LinkButton";
import { RoutePath } from "../../constants/route.constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIntersection } from "../../hooks/useIntersectionObserver";
import { intersectionOptions } from "../Navbar/Navbar";
import { useMenu } from "../contexts/menu/Menu.context";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { ReactNode } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { AppMediaBreakpoints } from "../../constants/style.constants";

export function LinksWrapper({ forFooter = false, children }: { forFooter?: boolean; children?: ReactNode }) {
  const { t: translation } = useTranslation();
  const { pathname, push } = useRouter();
  const { toggleMenu } = useMenu();
  const { width } = useWindowSize();

  const isTabletSize = width <= AppMediaBreakpoints.Tablet;

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

  const handleTermsClick = () => {
    if (isTabletSize) toggleMenu();
  };

  const linkWrapperStyles = classNames({
    [styles.linkWrapper]: !forFooter,
    [styles.footerLinkWrapper]: forFooter,
  });

  const linkButtonStyles = classNames({
    [styles.linkButton]: !forFooter,
  });

  return (
    <div className={linkWrapperStyles}>
      <LinkButton
        handleClick={() => {
          if (isTabletSize) toggleMenu();
          handleScrollNavigation(RoutePath.features())();
        }}
        className={linkButtonStyles}
        isActive={isFeaturesComponentIntersecting}
      >
        {translation(`routes.features`)}
      </LinkButton>

      <LinkButton
        handleClick={() => {
          if (isTabletSize) toggleMenu();
          handleScrollNavigation(RoutePath.about())();
        }}
        className={linkButtonStyles}
        data-text={translation(`routes.about`)}
        isActive={isAboutComponentIntersecting}
      >
        {translation(`routes.about`)}
      </LinkButton>

      <LinkButton
        handleClick={() => {
          if (isTabletSize) toggleMenu();
          handleScrollNavigation(RoutePath.faq())();
        }}
        className={linkButtonStyles}
        isActive={isFaqComponentIntersecting}
      >
        {translation(`routes.faq`)}
      </LinkButton>

      <Link onClick={handleTermsClick} href={RoutePath.terms()}>
        <LinkButton className={linkButtonStyles} isActive={pathname === RoutePath.terms()}>
          {translation(`routes.terms`)}
        </LinkButton>
      </Link>

      {children}
    </div>
  );
}
