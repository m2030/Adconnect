import '@testing-library/jest-dom';

// (optional) mock keycloak-js so unit tests don’t hit a real server
import { vi } from 'vitest';
vi.mock('keycloak-js', () => {
  class KC {
    authenticated = false;
    tokenParsed: any = null;
    login = vi.fn(async () => undefined);
    logout = vi.fn(async () => undefined);
    init = vi.fn(async () => false);
  }
  return { default: KC };
});

