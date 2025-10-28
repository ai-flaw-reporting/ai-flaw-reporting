export const isDomainOrHttpsUrl = (input: string): boolean => {
  const v = input.trim();
  if (!v) return false;

  const hasScheme = /^([a-zA-Z][a-zA-Z0-9+.-]*:)?\/\//.test(v);

  if (!hasScheme) {
    // Bare domain only, optionally a trailing slash
    // - labels: a-z0-9- (no leading/trailing dash in a label)
    // - at least one dot, TLD 2+ letters
    // - no path/query/hash/port
    const domainOnly = v.replace(/\/$/, ""); // allow a single trailing slash
    const domainRegex =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])\.)+[a-z]{2,}$/i;
    return domainRegex.test(domainOnly);
  }

  // With scheme: must be valid URL and https only
  let u: URL;
  try {
    u = new URL(v);
  } catch {
    return false;
  }

  if (u.protocol !== "https:") return false;

  // Disallow port, path, query, hash (adjust if you want to allow them)
  if (u.port) return false;
  const pathOk = u.pathname === "" || u.pathname === "/";
  const noExtras = !u.search && !u.hash;

  // Also ensure it has a sensible hostname (not an IP or empty)
  const hostnameOk =
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])\.)+[a-z]{2,}$/i.test(u.hostname);

  return hostnameOk && pathOk && noExtras;
};
