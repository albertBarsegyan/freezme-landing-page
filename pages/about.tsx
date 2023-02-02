import { PageLayout } from "../src/components/Layouts/PagetLayout/PageLayout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Hero } from "../src/components/Hero/Hero";
import { useTranslation } from "next-i18next";
import { History } from "../src/components/pages/about/History/History";
import { Team } from "../src/components/pages/about/Team/Team";
import Head from "next/head";
import { TeamMembers, Trainers } from "../src/constants/profiles.constants";

export default function About() {
  const { t: translation } = useTranslation("about");
  const { t: commonTranslation } = useTranslation("common");

  return (
    <PageLayout>
      <Head>
        <title>{commonTranslation("routes.about")}</title>
      </Head>
      <Hero header={translation("about-header-title")} description={translation("about-header-description")} />
      <History />

      <Team profiles={TeamMembers} headerText={translation("team-title")} profileImagePath={"/static/img/team/"} />
      <Team profiles={Trainers} headerText={translation("trainer-title")} profileImagePath={"/static/img/trainers/"} />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["about", "common"])),
    },
  };
};
