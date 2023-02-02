import { CourseType, Month } from "../../types/courses.types";
import { ComponentWithChildren } from "../../types/component.types";
import { ImageLoader } from "../ImageLoader/ImageLoader";
import { useRouter } from "next/router";
import { getDataByLocale } from "../../utils/object.utils";
import { dateMerge, textToUpperFirstLetter } from "../../utils/string.utils";
import { useTranslation } from "next-i18next";
import styles from "./CourseRenderer.module.css";
import { LinkButton } from "../general/Button/Link/LinkButton";

interface CoursePageWrapperProps extends ComponentWithChildren {
  hasFaq: boolean;
}

export function CoursePageWrapper({ children, hasFaq }: CoursePageWrapperProps) {
  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  return (
    <div style={{ width: "100%", paddingBottom: hasFaq ? 0 : "120px" }}>
      <div className={styles.moreButtonWrapper}>
        <LinkButton handleClick={navigateBack} className={styles.moreButton} isActive={false}>
          <span className={styles.backSign}>{"<"}</span> <span style={{ marginLeft: "17px" }}> See more</span>
        </LinkButton>
      </div>
      <div className={styles.coursePageWrapper}>{children}</div>
    </div>
  );
}

export function CourseRenderer({ course }: { course: CourseType }) {
  const { t: translation } = useTranslation("courses");
  const { t: commonTranslation } = useTranslation("common");
  const { locale } = useRouter();
  const courseDescription = getDataByLocale<CourseType>({ locale, object: course, field: "description" });
  const courseName = getDataByLocale<CourseType>({ locale, object: course, field: "name" });

  const dates = {
    [Month.jan]: commonTranslation("dates.jan"),
    [Month.feb]: commonTranslation("dates.feb"),
    [Month.mar]: commonTranslation("dates.mar"),
    [Month.apr]: commonTranslation("dates.apr"),
    [Month.may]: commonTranslation("dates.may"),
    [Month.jun]: commonTranslation("dates.jun"),
    [Month.jul]: commonTranslation("dates.jul"),
    [Month.aug]: commonTranslation("dates.aug"),
    [Month.sep]: commonTranslation("dates.sep"),
    [Month.oct]: commonTranslation("dates.oct"),
    [Month.nov]: commonTranslation("dates.nov"),
    [Month.dec]: commonTranslation("dates.dec"),
  };

  return (
    <div className={styles.courseRendererWrapper}>
      <div>
        <div className={styles.courseHeadPart}>
          <ImageLoader width={60} height={60} src={course.image} alt={course.name_en_us} />

          <span className={styles.courseFormatText}>{course.course_format}</span>
        </div>

        <h1 className={styles.courseName}>{courseName}</h1>

        <div className={styles.courseInfoWrapper}>
          <div>
            <span className={styles.infoTitle}> {translation("course-info-title.start-day")} </span>
            <span className={styles.infoContent}>
              {dateMerge({
                startDay: course.start_day,
                startMonth: dates[course.start_month],
              })}
            </span>
          </div>
          <div>
            <span className={styles.infoTitle}>{translation("course-info-title.weekly")}</span>
            <span className={styles.infoContent}>{course.weekly} hours</span>
          </div>
          <div>
            <span className={styles.infoTitle}>{translation("course-info-title.duration")}</span>
            <span className={styles.infoContent}>
              {course.duration} {translation("course-duration-content.months")}
            </span>
          </div>
          <div>
            <span className={styles.infoTitle}>{translation("course-info-title.level")}</span>
            <span className={styles.infoContent}>{textToUpperFirstLetter(course.level)}</span>
          </div>
          <div>
            <span className={styles.infoTitle}>{translation("course-info-title.price")}</span>
            <span className={styles.infoContent}>
              {course.price} {translation("course-price-content.amd-per-month")}
            </span>
          </div>
          <div>
            <span className={styles.certification}>{translation("course-certification-info")}</span>
          </div>
        </div>

        <p className={styles.courseDescription}>{courseDescription}</p>
      </div>
    </div>
  );
}
