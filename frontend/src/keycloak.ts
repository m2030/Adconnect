// src/keycloak.ts
import Keycloak from "keycloak-js";

const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID; // reuse below

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,        // ✅ use VITE_KEYCLOAK_URL
  realm: import.meta.env.VITE_KEYCLOAK_REALM,    // ✅ use VITE_KEYCLOAK_REALM
  clientId                                      : clientId // ✅ don't hard-code 'frontend'
});

export async function initKeycloak() {
  await keycloak.init({
    onLoad: "check-sso",
    checkLoginIframe: false,
    pkceMethod: "S256",
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    scope: "openid profile email roles"
  });
}

export function login(opts?: { redirectUri?: string }) { return keycloak.login(opts); }
export function logout() { return keycloak.logout(); }
export function isAuthenticated() { return !!keycloak.authenticated; }
export function roles(): string[] {
  const p: any = keycloak.tokenParsed || {};
  const realmRoles  = p?.realm_access?.roles ?? [];
  const clientRoles = p?.resource_access?.[clientId!]?.roles ?? [];
  return Array.from(new Set([...realmRoles, ...clientRoles]));
}
export function hasRole(r: string) { return roles().includes(r); }
export default keycloak;   // ✅ add this line