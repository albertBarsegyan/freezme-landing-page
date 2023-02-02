// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en_us",
    locales: [
      "en_us",
      // "hy",
      // "ru"
    ],
    localePath: path.resolve("./public/locales"),
  },
};
