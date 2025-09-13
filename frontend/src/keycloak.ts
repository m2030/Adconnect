import Keycloak from "keycloak-js";

const kcUrl      = import.meta.env.VITE_KC_URL || "http://localhost:8080";
const kcRealm    = import.meta.env.VITE_KEYCLOAK_REALM || "demo";
const kcClientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "frontend";

export const keycloak = new Keycloak({
  url: kcUrl,
  realm: kcRealm,
  clientId: kcClientId,
});

let initOnce: Promise<boolean> | null = null;

/** Call this anywhere; it will only initialize once. */
export function initKeycloak() {
  if (initOnce) return initOnce;
  initOnce = keycloak
    .init({
      onLoad: "check-sso",
      checkLoginIframe: false, // avoid iframe timer + dev noise
      pkceMethod: "S256",
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      scope: "openid profile email roles",
    })
    .catch((e) => {
      // Non-fatal for public pages; we’ll show public UI
      console.warn("Keycloak init error (non-fatal):", e);
      return false;
    });
  return initOnce;
}

export function login(opts?: Parameters<typeof keycloak.login>[0]) {
  return keycloak.login(opts);
}
export function logout() { return keycloak.logout(); }
export function isAuthenticated() { return !!keycloak.authenticated; }
export function roles(): string[] {
  const p: any = keycloak.tokenParsed || {};
  const realmRoles = p?.realm_access?.roles ?? [];
  const clientId = kcClientId;
  const clientRoles = p?.resource_access?.[clientId]?.roles ?? [];
  return Array.from(new Set([...realmRoles, ...clientRoles]));
}
export function hasRole(r: string) { return roles().includes(r); }
export default keycloak;
