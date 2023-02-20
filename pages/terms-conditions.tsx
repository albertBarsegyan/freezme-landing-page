import { PageLayout } from "../src/components/Layouts/PagetLayout/PageLayout";
import TermsAndConditionsContent from "../src/components/TermsAndConditionsContent/TermsAndConditionsContent";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";

export default function TermsConditions() {
  const { t: commonTranslation } = useTranslation("common");

  return (
    <PageLayout hasPadding>
      <Head>
        <title>{commonTranslation("routes.terms")}</title>
      </Head>
      <TermsAndConditionsContent />
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
