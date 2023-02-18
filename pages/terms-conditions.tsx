import { PageLayout } from "../src/components/Layouts/PagetLayout/PageLayout";
import TermsAndConditionsContent from "../src/components/TermsAndConditionsContent/TermsAndConditionsContent";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function TermsConditions() {
  return (
    <PageLayout hasPadding>
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
