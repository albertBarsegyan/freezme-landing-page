import { useTranslation } from "next-i18next";
import styles from "./ProjectSection.module.css";
import { Project, ProjectVariant } from "../Project/Project";
import { useInfiniteQuery } from "react-query";
import { QueryKey } from "../../../../constants/service.constants";
import { getProjects } from "../../../../services/project.services";
import { urlQueryToObject } from "../../../../utils/object.utils";
import { EmptyState } from "../../../EmptyState/EmptyState";

export function ProjectsSection() {
  const { t: translation } = useTranslation("home");
  const { data } = useInfiniteQuery([QueryKey.Projects, 1], ({ pageParam = 1 }) => getProjects({ page: pageParam }), {
    getNextPageParam: (data) => {
      if (data?.next) {
        const res = urlQueryToObject(data?.next);
        return res.page ? Number(res.page) : undefined;
      }
    },
  });

  // const handleScrollFetching = async (event: any) => {
  //   const scrollPosition = event.target.scrollLeft;
  //   const scrollableWith = event.target.scrollWidth - event.target.offsetWidth;
  //   if (scrollableWith - scrollPosition <= 100 && hasNextPage) {
  //     await fetchNextPage();
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContent}>
        <div className={styles.headerWrapper}>
          <p className={styles.header}>{translation("projects-header")}</p>
          <p className={styles.description}>{translation("projects-description")}</p>
        </div>
      </div>
      <div
        className={styles.projectsWrapper}
        // onScroll={handleScrollFetching}
      >
        {data?.pages &&
          data.pages.map((data) => {
            return data?.results.length ? (
              data?.results.map((project) => (
                <Project hasDescriptionShorter variant={ProjectVariant.Scrollable} project={project} key={project.id} />
              ))
            ) : (
              <EmptyState />
            );
          })}
      </div>
    </div>
  );
}
