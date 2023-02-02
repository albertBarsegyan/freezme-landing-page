export const RoutePath = {
  home: () => "/",
  courses: (id?: number) => `/courses${id ? "/" + id : ""}`,
  about: () => "/about",
  projects: () => "/projects",
  contact: () => "/contact",
};
