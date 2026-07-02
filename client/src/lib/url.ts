/**
 * Normalizes URL by removing protocol, www, and trailing slash for comparison purposes
 */
export const normalizeUrl = (url: string): string => {
  return url
    .replace(/^https?:\/\//, "") // remove protocol
    .replace(/^www\./, "") // remove www
    .replace(/\/$/, "") // remove trailing slash
    .toLowerCase();
};

export const isDomainOrHttpsUrl = (input: string): boolean => {
  const v = input.trim();
  if (!v) return false;

  const hasScheme = /^([a-zA-Z][a-zA-Z0-9+.-]*:)?\/\//.test(v);

  if (!hasScheme) {
    // No scheme: prepend https:// and validate as a full URL
    let u: URL;
    try {
      u = new URL(`https://${v}`);
    } catch {
      return false;
    }

    if (u.port) return false;

    const hostnameOk =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])\.)+[a-z]{2,}$/i.test(
        u.hostname,
      );
    return hostnameOk;
  }

  // With scheme: must be valid HTTPS URL
  let u: URL;
  try {
    u = new URL(v);
  } catch {
    return false;
  }

  if (u.protocol !== "https:") return false;

  // Disallow port
  if (u.port) return false;

  // Hostname must be a sensible domain (no IP)
  const hostnameOk =
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])\.)+[a-z]{2,}$/i.test(u.hostname);

  return hostnameOk;
};
