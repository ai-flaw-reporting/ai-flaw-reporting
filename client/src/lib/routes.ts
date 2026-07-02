export const routes = {
  home: "/",
  resources: "/resources",
  introductionReport: "/introduction-ai-flaw-report",
  report: "/ai-flaw-report",
  dashboard: "/d4shb04rd",
  aboutUs: "/about-us",
  contact: "#",
  openSource: "https://github.com/ai-flaw-reporting/ai-flaw-reporting",
} as const;

export type RouteKey = keyof typeof routes;
