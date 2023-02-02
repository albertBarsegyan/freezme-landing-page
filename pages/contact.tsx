import { PageLayout } from "../src/components/Layouts/PagetLayout/PageLayout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ContactInfo } from "../src/components/pages/contact/ContactInfo/ContactInfo";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export default function Contact() {
  const { t: commonTranslation } = useTranslation("common");

  return (
    <PageLayout hasPadding={false}>
      <Head>
        <title>{commonTranslation("routes.contact")}</title>
      </Head>

      <ContactInfo />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["contact", "common"])),
    },
  };
};
