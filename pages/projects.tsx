import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PageLayout } from "../src/components/Layouts/PagetLayout/PageLayout";
import { SpecialProjects } from "../src/components/SpecialProjects/SpecialProjects";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export default function Projects() {
  const { t: commonTranslation } = useTranslation("common");

  return (
    <PageLayout>
      <Head>
        <title>{commonTranslation("routes.projects")}</title>
      </Head>
      <SpecialProjects />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["projects", "common"])),
    },
  };
};
