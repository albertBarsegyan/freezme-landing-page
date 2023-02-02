import { useTranslation } from "next-i18next";
import styles from "./CoursesSection.module.css";
import { CourseFormat, CourseLevel } from "../../../../types/courses.types";
import { getCourses } from "../../../../services/course.services";
import { QueryKey } from "../../../../constants/service.constants";
import { useQuery } from "react-query";
import { Course, CourseVariant } from "../Course/Course";
import { EmptyState } from "../../../EmptyState/EmptyState";

const Achievements = [
  {
    id: 0,
    count: "#50000",
    name: "Applicants",
    description: "GITC is the leading and largest technology center providing education in the regions",
  },
  {
    id: 1,
    count: "#10000",
    name: "Students",
    description:
      "Most of GITC graduates are from the regions of Armenia. Its graduates have played a significant role in the establishment of over 20 companies in the regions",
  },
  {
    id: 2,
    count: "#5000",
    name: "Employed",
    description:
      "GITC has created a platform to link its students with the industry and private sector, with the goal of helping its graduates either start their own companies or secure employment with leading tech businesses",
  },

  {
    id: 3,
    count: "#1500",
    name: "Targeted Beneficiaries",
    description:
      "GITC has been able to provide tech education and job opportunities to 1500 individuals in need, including veterans, single mothers, females, and refugees, thanks to the support of its donors",
  },
];

export const CourseInitialSettings = {
  level: CourseLevel.BEGINNER,
  format: CourseFormat.OFFLINE,
  page: 1,
};

export function CoursesSection() {
  const { t: translation } = useTranslation("home");
  const { data } = useQuery([QueryKey.Courses, 1], () => getCourses(CourseInitialSettings));

  if (data?.results && data?.results.length >= 4) {
    data.results.length = 4;
  }

  return (
    <div className={styles.sectionWrapper}>
      <div style={{ marginBottom: "40px" }}>
        <h2 className={styles.header}>{translation("courses-header")}</h2>
        <p className={styles.description}>{translation("courses-description")}</p>
      </div>

      <div className={styles.courseAndAchievementWrapper}>
        <div className={styles.courseWrapper}>
          {data?.results?.length ? (
            data?.results?.map((course) => (
              <Course key={course.id} variant={CourseVariant.NotScrollable} course={course} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        <div className={styles.achievementWrapper}>
          {Achievements.map((achievement) => {
            return (
              <div key={achievement.id} className={styles.achievementBlock}>
                <p className={styles.count}>{achievement.count}</p>
                <p className={styles.name}>{achievement.name}</p>
                <p className={styles.description}>{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
