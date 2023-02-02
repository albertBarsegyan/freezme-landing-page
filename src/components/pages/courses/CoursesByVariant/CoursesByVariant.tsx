import { ButtonVariant, PrimaryButton } from "../../../general/Button/Primary/PrimaryButton";
import React, { useState } from "react";
import styles from "./CoursesByVariant.module.css";
import { useTranslation } from "next-i18next";

import { Course, CourseVariant } from "../../home/Course/Course";
import { useInfiniteQuery } from "react-query";
import { QueryKey } from "../../../../constants/service.constants";
import { getCourses } from "../../../../services/course.services";
import { CourseFormat, CourseLevel } from "../../../../types/courses.types";
import { urlQueryToObject } from "../../../../utils/object.utils";
import { Loader, LoaderVariant } from "../../../Loader/Loader";
import { EmptyState } from "../../../EmptyState/EmptyState";

export const CourseFormatData = {
  Offline: { title: "Standart", nameId: CourseFormat.OFFLINE },
  Online: { title: "Online", nameId: CourseFormat.ONLINE },
};

interface CoursesByFormatProps {
  courseFormat: CourseFormat;
}

const CourseLevels = [
  {
    nameId: "beginner",
    level: CourseLevel.BEGINNER,
  },
  {
    nameId: "intermediate",
    level: CourseLevel.INTERMEDIATE,
  },
  {
    nameId: "advanced",
    level: CourseLevel.ADVANCED,
  },
];

export function CoursesByVariant({ courseFormat }: CoursesByFormatProps) {
  const { t: translation } = useTranslation("courses");

  const [courseLevel, setCourseLevel] = useState(CourseLevels[0]);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    [QueryKey.Courses, { format: courseFormat, level: courseLevel.level }],
    ({ pageParam = 1 }) =>
      getCourses({
        format: courseFormat,
        page: pageParam,
        level: courseLevel.level,
      }),
    {
      getNextPageParam: (data) => {
        if (data?.next) {
          const res = urlQueryToObject(data?.next);
          return res.page ? Number(res.page) : undefined;
        }
      },
    }
  );

  const handleCoursesScroll = async (event: any) => {
    const scrollPosition = event.target.scrollLeft;
    const scrollableWith = event.target.scrollWidth - event.target.offsetWidth;
    if (scrollableWith - scrollPosition <= 300 && hasNextPage) {
      await fetchNextPage();
    }
  };

  const handleCourseLevel = (courseLevelItem: { nameId: string }) => () => {
    const foundCourse = CourseLevels.find((course) => course.nameId === courseLevelItem.nameId);
    if (foundCourse) setCourseLevel(foundCourse);
  };

  return (
    <div>
      <div>
        {CourseLevels.map((courseLevelItem) => {
          return (
            <div className={styles.buttonWrapper} key={courseLevelItem.nameId}>
              <PrimaryButton
                className={styles.courseVariantButton}
                active={courseLevelItem.nameId === courseLevel.nameId}
                variant={ButtonVariant.TextSecondary}
                handleClick={handleCourseLevel(courseLevelItem)}
              >
                {translation(`course-level-buttons.${courseLevelItem.nameId}`)}
              </PrimaryButton>
            </div>
          );
        })}
      </div>

      <Loader variant={LoaderVariant.Regular} isLoading={isLoading}>
        <div onScroll={handleCoursesScroll} className={styles.coursesWrapper}>
          {data?.pages.map((page) => {
            return page?.results.length ? (
              page.results.map((course) => {
                return <Course variant={CourseVariant.Scrollable} course={course} key={course.id} />;
              })
            ) : (
              <EmptyState />
            );
          })}
        </div>
      </Loader>
    </div>
  );
}
