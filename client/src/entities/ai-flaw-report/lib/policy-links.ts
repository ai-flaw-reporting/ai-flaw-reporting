import { truncateText } from "~/lib/utils";

import type { PolicyLink } from "../model/types";
import { POLICIES } from "../model/constants";

export function getPolicyLinks(selectedSystems: string[]): PolicyLink[] {
  const links: PolicyLink[] = [];

  for (const system of selectedSystems) {
    const companyName = (system.split(/[\s(]/)[0] ?? system).toLowerCase();
    const systemLinks = POLICIES[companyName];
    if (systemLinks) {
      links.push(...systemLinks);
    }
  }

  const MAX_LABEL_LENGTH = 13;
  return links.map((link) => ({
    ...link,
    label: truncateText(link.label, MAX_LABEL_LENGTH),
  }));
}

export { POLICIES };
