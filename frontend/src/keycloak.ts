// src/keycloak.ts
import Keycloak from "keycloak-js";

const url = import.meta.env.VITE_KEYCLOAK_URL;
const realm = import.meta.env.VITE_KEYCLOAK_REALM;
const envClientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KC_URL, // or use `url`
  realm: "demo",                    // or use `realm`
  clientId: "frontend"              // keep as-is for runtime; tests can rely on this
});

// --- NEW: resolve clientId robustly (env -> instance -> config) ---
function resolveClientId(): string | undefined {
  if (envClientId) return envClientId;
  // @ts-ignore keycloak has clientId at runtime
  if ((keycloak as any).clientId) return (keycloak as any).clientId;
  // @ts-ignore some versions keep it under config
  if ((keycloak as any).config?.clientId) return (keycloak as any).config.clientId;
  return undefined;
}

export function login(opts?: { redirectUri?: string }) { return keycloak.login(opts); }
export function logout() { return keycloak.logout(); }
export function isAuthenticated() { return !!keycloak.authenticated; }

export function roles(): string[] {
  const p: any = keycloak.tokenParsed || {};
  const realmRoles: string[] = p?.realm_access?.roles ?? [];
  const rsrc = (p?.resource_access ?? {}) as Record<string, { roles?: string[] }>;

  const cid = resolveClientId();

  // If we know the clientId, read just that; otherwise union all client roles.
  const clientRoles: string[] = cid
    ? (rsrc[cid]?.roles ?? [])
    : Object.values(rsrc).flatMap(r => r?.roles ?? []);

  return Array.from(new Set([...realmRoles, ...clientRoles]));
}

export function hasRole(r: string) { return roles().includes(r); }

export async function initKeycloak() {
  await keycloak.init({
    onLoad: "check-sso",
    checkLoginIframe: false,
    pkceMethod: "S256",
    silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
    scope: "openid profile email roles"
  });
}

export default keycloak;
