import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { PageLayout } from "../../src/components/Layouts/PagetLayout/PageLayout";
import { Hero } from "../../src/components/Hero/Hero";
import { AllCourses } from "../../src/components/pages/courses/AllCourses/AllCourses";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export default function Courses() {
  const { t: translation } = useTranslation("courses");
  const { t: commonTranslation } = useTranslation("common");

  return (
    <PageLayout>
      <Head>
        <title>{commonTranslation("routes.courses")}</title>
      </Head>
      <Hero header={translation("courses-header-title")} description={translation("courses-header-description")} />
      <AllCourses />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["courses", "common"])),
    },
  };
};
