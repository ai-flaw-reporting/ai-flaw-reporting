export const routes = {
  home: "/",
  resources: "/resources",
  report: "/ai-flaw-report",
  dashboard: "/dashboard",
  aboutUs: "/about-us",
  contact: "#",
  openSource: "#",
} as const;

export type RouteKey = keyof typeof routes;
