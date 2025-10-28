export type Resource = {
  id: string;
  title: string;
  organizationType: string;
  scopesType: string;
  scopes: string[];
  summary: string;
  icon: string | null;
  reportUrl: string | null;
  readMoreUrl: string | null;
};

export type FilterParams = {
  formScope: string | null;
  organizationType: string | null;
};
