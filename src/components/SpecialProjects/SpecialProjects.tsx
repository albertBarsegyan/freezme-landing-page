import { Project, ProjectVariant } from "../pages/home/Project/Project";
import styles from "./SpecialProjects.module.css";
import { useInfiniteQuery } from "react-query";
import { QueryKey } from "../../constants/service.constants";
import { getProjects } from "../../services/project.services";
import { useRouter } from "next/router";
import { urlQueryToObject } from "../../utils/object.utils";
import { Loader, LoaderVariant } from "../Loader/Loader";
import { EmptyState } from "../EmptyState/EmptyState";

export function SpecialProjects() {
  const { locale } = useRouter();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery(
    [QueryKey.Projects, { locale }],
    ({ pageParam = 1 }) => getProjects({ page: pageParam }),
    {
      getNextPageParam: (data) => {
        if (data?.next) {
          const res = urlQueryToObject(data?.next);
          return res.page ? Number(res.page) : undefined;
        }
      },
    }
  );

  const handleProjectScroll = async (event: any) => {
    const fromTopHeight = event.target.scrollTop;

    const height = event.target.scrollHeight - event.target.offsetHeight;

    if (height - fromTopHeight <= 500 && hasNextPage) await fetchNextPage();
  };

  return (
    <>
      <Loader variant={LoaderVariant.FullScreen} isLoading={isLoading || isFetching} />
      <div className={styles.wrapper} onScroll={handleProjectScroll}>
        {data?.pages &&
          data.pages.map((page) => {
            return page?.results.length ? (
              page?.results.map((project) => {
                return (
                  <Project
                    hasDescriptionShorter={false}
                    key={project.id}
                    project={project}
                    variant={ProjectVariant.Regular}
                  />
                );
              })
            ) : (
              <EmptyState />
            );
          })}
      </div>
    </>
  );
}
