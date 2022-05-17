export const isSubdomainExists = (domain: string, host: string): boolean => {
  const regex = new RegExp(`^([a-z0-9]+\\.)(${domain})(:\\d{4})?`, 'i');
  const subdomain = host.match(regex);
  if (subdomain === null) return false;
  return true;
};
