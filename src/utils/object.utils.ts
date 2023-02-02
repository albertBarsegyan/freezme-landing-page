export function getDataByLocale<T extends { [key: string]: any }>({
  locale,
  object,
  field,
}: {
  locale?: string;
  object: T;
  field: string;
}) {
  const fieldName = `${field}_${locale}`;

  return Boolean(object) && object.hasOwnProperty(fieldName) ? object[fieldName] : null;
}

export const urlQueryToObject = (url: string) => {
  if (url) {
    const searchParams = new URLSearchParams(new URL(url).search);
    return Object.fromEntries(searchParams);
  }

  return {};
};
