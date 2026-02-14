export function getRealmRoles(tokenParsed: any): string[] {
  return tokenParsed?.realm_access?.roles ?? [];
}

export function isVerified(tokenParsed: any): boolean {
  return getRealmRoles(tokenParsed).includes("verified_user");
}

export function isSponsor(tokenParsed: any): boolean {
  return getRealmRoles(tokenParsed).includes("sponsor");
}

export function isAdvertiser(tokenParsed: any): boolean {
  return getRealmRoles(tokenParsed).includes("advertiser");
}

export function getUserMode(tokenParsed: any) {
  return {
    verified: isVerified(tokenParsed),
    sponsor: isSponsor(tokenParsed),
    advertiser: isAdvertiser(tokenParsed),
    readOnly: !isVerified(tokenParsed),
  };
}