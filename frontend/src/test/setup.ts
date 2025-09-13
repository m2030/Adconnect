import "@testing-library/jest-dom";
import { vi } from "vitest";

// mock keycloak-js so imports don’t explode in tests
vi.mock("keycloak-js", () => ({
  default: vi.fn().mockImplementation(() => ({
    init: vi.fn().mockResolvedValue(true),
    login: vi.fn(),
    logout: vi.fn(),
    authenticated: false,
    tokenParsed: {}
  }))
}));

// silence React Router future flags (optional)
(globalThis as any).__reactRouterVersionWarning = true;
