import { GetServerSideProps } from "next";
import { getCourse } from "../../src/services/course.services";
import { CourseType } from "../../src/types/courses.types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CoursePageWrapper, CourseRenderer } from "../../src/components/CourseRenderer/CourseRenderer";
import { CourseEnrollForm } from "../../src/forms/CourseEnrollForm/CourseEnrollForm";
import { CourseFaq } from "../../src/components/CourseFaq/CourseFaq";
import { PageLayout } from "../../src/components/Layouts/PagetLayout/PageLayout";
import Head from "next/head";
import { getDataByLocale } from "../../src/utils/object.utils";

export default function Course({ course, locale }: { course: CourseType; locale: string }) {
  const courseName = getDataByLocale({ locale, object: course, field: "name" });

  return (
    <div>
      <Head>
        <title>{courseName}</title>
      </Head>
      <PageLayout>
        <CoursePageWrapper hasFaq={Boolean(course.faq.length)}>
          <CourseRenderer course={course} />
          <CourseEnrollForm courseId={course.id} />
        </CoursePageWrapper>
        <CourseFaq faqs={course?.faq} />
      </PageLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  const course = await getCourse({ id: String(params?.id) ?? 1 });

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["courses", "common"])),
      course,
      locale,
    },
  };
};
