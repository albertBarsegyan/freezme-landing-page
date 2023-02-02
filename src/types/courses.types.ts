import { Faq } from "./faq.types";

export enum Month {
  jan = "JAN",
  feb = "FEB",
  mar = "MAR",
  apr = "APR",
  may = "MAY",
  jun = "JUN",
  jul = "JUL",
  aug = "AUG",
  sep = "SEP",
  oct = "OCT",
  nov = "NOV",
  dec = "DEC",
}

export const enum CourseFormat {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export const enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export interface CourseType {
  id: number;
  faq: Faq[];
  name_en_us: string;
  name_hy: string;
  price: number;
  start_day: number;
  start_month: Month;
  weekly: number;
  duration: number;
  level: CourseLevel;
  description_en_us: string;
  description_hy: string;
  course_format: CourseFormat;
  image: string;
}

export interface CourseEnroll {
  name: string;
  email: string;
  region: string;
  phone_number: string;
}
