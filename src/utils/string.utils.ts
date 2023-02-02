export const stringShorter = ({
  string,
  maxLength = 83,
  off = false,
}: {
  string: string;
  maxLength?: number;
  off?: boolean;
}) => {
  const firstPart = string?.slice(0, maxLength);

  const ending = "...";

  if (off) {
    return string;
  }

  return `${firstPart + ending}`;
};

export const textToUpperFirstLetter = (text: string) => {
  const [firstLetter, ...rest] = text;

  return `${firstLetter.toUpperCase()}${rest.join("").toLowerCase()}`;
};

export const dateMerge = ({ startDay, startMonth }: { startDay: number; startMonth: string }) => {
  return `${startDay} ${startMonth}`;
};

export function numberWithCommas(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
