// src/tests/LoginPage.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

// Mock the authentication hook to control login behavior
vi.mock('../hooks/useAuthLogin', () => ({
  useAuth: () => ({
    login: vi.fn(() => Promise.resolve(null)), // Simulate successful login
    isLoading: false,
    role: null,
    error: null,
  }),
}));

// Mock the translation hook to simply return keys for simplicity
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('LoginPage Component', () => {
  it('renders the login page with correct elements', () => {
    render(
      <HashRouter>
        <LoginPage />
      </HashRouter>
    );

    // Check that the main company link and heading are rendered
    expect(screen.getByText('login')).not.toBeNull();
    expect(screen.getByText('Leos jobbland.')).not.toBeNull();

    // Check that input fields are rendered with correct placeholders
    expect(screen.getByPlaceholderText('email-or-username')).not.toBeNull();
    expect(screen.getByPlaceholderText('password')).not.toBeNull();;

    // Check that the button is rendered
    expect(screen.getByRole('button')).not.toBeNull();
  });

  

  // Additional tests can be added here to simulate user input,
  // verify localStorage updates, or test role-based navigation.
});