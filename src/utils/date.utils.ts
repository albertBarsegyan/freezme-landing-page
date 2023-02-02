import { Month } from "../types/courses.types";
import { MonthByIndex } from "../constants/date.constants";

const msToDays = (milliseconds: number) => Math.ceil(milliseconds / (1000 * 60 * 60 * 24));

export const getStartingDayInfo = ({ month, day }: { month: Month; day: number }): number | null => {
  const startingDate = new Date(new Date().getFullYear(), MonthByIndex.indexOf(month), day);
  const currentDate = new Date();

  const daysCount = msToDays(startingDate.getTime() - currentDate.getTime());

  if (daysCount <= 10) {
    return daysCount;
  }

  return null;
};
