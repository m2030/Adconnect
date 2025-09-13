import { describe, it, expect, vi } from 'vitest';
import keycloakDefault, { roles, hasRole, initKeycloak } from './keycloak';

describe('keycloak helpers', () => {
  it('merges realm + client roles', () => {
    (keycloakDefault as any).tokenParsed = {
      realm_access: { roles: ['admin', 'user'] },
      resource_access: { frontend: { roles: ['editor'] } }
    };
    expect(roles().sort()).toEqual(['admin', 'editor', 'user']);
    expect(hasRole('editor')).toBe(true);
    expect(hasRole('unknown')).toBe(false);
  });

  it('calls init with expected options', async () => {
    const initSpy = vi.spyOn(keycloakDefault, 'init');
    await initKeycloak();
    expect(initSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        onLoad: 'check-sso',
        checkLoginIframe: false,
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: expect.stringMatching(/silent-check-sso\.html$/),
        scope: 'openid profile email roles'
      })
    );
  });
});
