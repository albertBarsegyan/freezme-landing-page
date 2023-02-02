import styles from "./Course.module.css";
import { PrimaryButton } from "../../../general/Button/Primary/PrimaryButton";
import { ImageLoader } from "../../../ImageLoader/ImageLoader";
import { CourseType } from "../../../../types/courses.types";
import { useRouter } from "next/router";
import { getDataByLocale } from "../../../../utils/object.utils";
import { useTranslation } from "next-i18next";
import { getStartingDayInfo } from "../../../../utils/date.utils";
import { stringShorter } from "../../../../utils/string.utils";
import { RoutePath } from "../../../../constants/route.constants";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

const dayMessage = ({ message, days }: { message: string; days: number }) => {
  return message.replace("DAYS", String(days));
};

const monthMessage = ({ message, days }: { message: string; days: number }) => {
  return message.replace("MONTHS", String(days));
};

export const enum CourseVariant {
  Scrollable = "Scrollable",
  NotScrollable = "NotScrollable",
}

export function Course({ course, variant }: { course: CourseType; variant: CourseVariant }) {
  const { t: commonTranslation } = useTranslation("common");

  const { locale } = useRouter();

  const wrapperStyles = classNames({
    [styles.wrapper]: variant === CourseVariant.Scrollable,
    [styles.notScrollableWrapper]: variant === CourseVariant.NotScrollable,
  });

  const name = getDataByLocale({ locale, object: course, field: "name" });
  const description = getDataByLocale({ locale, object: course, field: "description" });
  const startingDaysCount = getStartingDayInfo({ month: course.start_month, day: course.start_day });
  const getCourseStartDayMessage = () => {
    if (startingDaysCount) {
      return Number(startingDaysCount) < 1
        ? commonTranslation("course-starting-messages.today")
        : dayMessage({
            message: commonTranslation("course-starting-messages.days-count"),
            days: Number(startingDaysCount),
          });
    }

    return null;
  };

  return (
    <div className={wrapperStyles}>
      <div className={styles.imageWrapper}>
        <Link rel="noreferrer" href={RoutePath.courses(course.id)}>
          <ImageLoader width={32} height={32} src={course.image} alt={name} />
        </Link>
        {getCourseStartDayMessage() && <span className={styles.startText}>{getCourseStartDayMessage()}</span>}
      </div>

      <div className={styles.contentWrapper}>
        <Link rel="noreferrer" href={RoutePath.courses(course.id)}>
          <p className={styles.courseName}>{name}</p>
        </Link>
        <p className={styles.duration}>
          {monthMessage({
            message: commonTranslation("course-duration-text"),
            days: course.duration,
          })}
        </p>

        <div className={styles.separator} />
        <p className={styles.description}>
          {stringShorter({
            string: description,
            maxLength: 120,
          })}
        </p>

        <Link style={{ width: "fit-content", display: "block" }} rel="noreferrer" href={RoutePath.courses(course.id)}>
          <PrimaryButton className={styles.submitButton}>{commonTranslation("enroll-button-title")}</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
