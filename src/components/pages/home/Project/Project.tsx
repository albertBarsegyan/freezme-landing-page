import { PrimaryButton } from "../../../general/Button/Primary/PrimaryButton";
import { useTranslation } from "next-i18next";
import styles from "./Project.module.css";
import classNames from "classnames";
import { ImageLoader } from "../../../ImageLoader/ImageLoader";
import { stringShorter } from "../../../../utils/string.utils";
import { Project } from "../../../../types/project.types";
import { getDataByLocale } from "../../../../utils/object.utils";
import { useRouter } from "next/router";
import { RoutePath } from "../../../../constants/route.constants";

export const enum ProjectVariant {
  Scrollable = "Scrollable",
  Regular = "Regular",
}

export function Project({
  project,
  variant,
  hasDescriptionShorter,
}: {
  project: Project;
  variant: ProjectVariant;
  hasDescriptionShorter?: boolean;
}) {
  const { locale, push } = useRouter();

  const { t: translation } = useTranslation("common");

  const wrapperStyle = classNames({
    [styles.wrapperShort]: variant === ProjectVariant.Scrollable,
    [styles.wrapperLong]: variant === ProjectVariant.Regular,
  });

  const contentStyle = classNames({
    [styles.contentWrapperShort]: variant === ProjectVariant.Scrollable,
    [styles.contentWrapperLong]: variant === ProjectVariant.Regular,
  });

  const title = getDataByLocale({ locale, object: project, field: "title" });
  const description = getDataByLocale({ locale, object: project, field: "description" });

  const navigateToProjects = async () => {
    await push(RoutePath.projects());
  };

  return (
    <div className={wrapperStyle}>
      <div className={styles.imageWrapper}>
        <ImageLoader className={styles.image} src={project.image} alt={title} />
      </div>
      <div className={contentStyle}>
        <p className={styles.header}>{title}</p>
        <p className={styles.description}>
          {hasDescriptionShorter
            ? stringShorter({
                string: description,
                maxLength: 100,
              })
            : description}
        </p>
        {hasDescriptionShorter && (
          <PrimaryButton handleClick={navigateToProjects}>{translation("read-more-button-title")}</PrimaryButton>
        )}
      </div>
    </div>
  );
}
