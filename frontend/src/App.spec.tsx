import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import keycloak from './keycloak';

describe('App', () => {
  it('shows login button and calls Keycloak.login', async () => {
    render(<App />);
    const btn = await screen.findByRole('button', { name: /continue with keycloak/i });
    const spy = vi.spyOn(keycloak, 'login');
    fireEvent.click(btn);
    expect(spy).toHaveBeenCalled();
  });
});
