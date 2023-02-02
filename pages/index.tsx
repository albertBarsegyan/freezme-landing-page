import { PageLayout } from "../src/components/Layouts/PagetLayout/PageLayout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Header } from "../src/components/pages/home/Header/Header";
import { Partners } from "../src/components/pages/home/Companies/Partners";
import { CoursesSection } from "../src/components/pages/home/CoursesSection/CoursesSection";
import { ProjectsSection } from "../src/components/pages/home/ProjectsSection/ProjectsSection";
import { StoriesSection } from "../src/components/pages/home/StoriesSection/StoriesSection";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t: commonTranslation } = useTranslation("common");

  return (
    <PageLayout>
      <Head>
        <title>{commonTranslation("routes.home")}</title>
      </Head>
      <Header />
      <Partners />
      <CoursesSection />
      <ProjectsSection />
      <StoriesSection />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["home", "common"])),
    },
  };
};
