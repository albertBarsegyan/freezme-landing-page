import axiosConfigured from "../libs/axios/main.config";

import { PaginatedResponse } from "../types/response.types";
import { CourseFormat, CourseLevel, CourseType } from "../types/courses.types";
import { AxiosError } from "axios";

export async function getCourses({
  level,
  format,
  page,
}: {
  level: CourseLevel;
  format: CourseFormat;
  page: number;
}): Promise<PaginatedResponse<CourseType> | null> {
  try {
    const params = new URLSearchParams({
      level,
      course_format: format,
      page: String(page),
    }).toString();

    const res = await axiosConfigured.get(`courses/?${params}`);

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getCourse({ id }: { id: number | string }): Promise<CourseType | AxiosError> {
  try {
    const res = await axiosConfigured.get(`courses/${id}`);

    return res.data;
  } catch (error) {
    return error as AxiosError;
  }
}

interface CourseEnroll {
  name: string;
  email: string;
  region: string;
  phone_number: string;
  id: number;
}

export async function enrollForCourse(request: CourseEnroll): Promise<CourseEnroll | null> {
  try {
    const { id, ...body } = request;

    const res = await axiosConfigured.post(`courses/${id}/enroll/`, body);

    return res.data;
  } catch (error) {
    return null;
  }
}
