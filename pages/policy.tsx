import { PageLayout } from "../src/components/Layouts/PagetLayout/PageLayout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PolicyContent from "../src/components/PolicyContent/PolicyContent";

export default function Policy() {
  return (
    <PageLayout hasPadding>
      <PolicyContent />
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
