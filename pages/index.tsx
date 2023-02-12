import { PageLayout } from "../src/components/Layouts/PagetLayout/PageLayout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Header } from "../src/components/pages/home/Header/Header";
import { useTranslation } from "next-i18next";
import { Features } from "../src/components/Features/Features";
import { AboutProduct } from "../src/components/AboutProduct/AboutProduct";
import { Faq } from "../src/components/Faq/Faq";
import { Chat } from "../src/components/Chat/Chat";

export default function Home() {
  const { t: commonTranslation } = useTranslation("common");

  return (
    <PageLayout hasPadding={false}>
      <Head>
        <title>{commonTranslation("routes.home")}</title>
      </Head>
      <Header />
      <Features />
      <AboutProduct />
      <Faq />
      <Chat />
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
