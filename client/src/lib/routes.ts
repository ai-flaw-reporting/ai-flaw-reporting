export const routes = {
  home: "/",
  resources: "/resources",
  report: "/report",
  dashboard: "/dashboard",
  contact: "#",
  openSource: "#",
} as const;

export type RouteKey = keyof typeof routes;
