import { useTranslation } from "next-i18next";
import { CoursePresenter } from "../CoursePresenter/CoursePresenter";
import { CoursesByVariant } from "../CoursesByVariant/CoursesByVariant";
import { CourseFormat } from "../../../../types/courses.types";

export function AllCourses() {
  const { t: translation } = useTranslation("courses");

  return (
    <div style={{ paddingBottom: "90px" }}>
      <CoursePresenter
        headerText={translation("standart-courses-header")}
        descriptionText={translation("standart-courses-description")}
      />

      <CoursesByVariant courseFormat={CourseFormat.OFFLINE} />

      <CoursePresenter
        headerText={translation("online-courses-header")}
        descriptionText={translation("online-courses-description")}
      />

      <CoursesByVariant courseFormat={CourseFormat.ONLINE} />
    </div>
  );
}
