// src/tests/LoginPage.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import LoginPage from '../pages/LoginPage';



describe("LoginPage", () => {  
  it('renders the login page with correct elements', () => {
    render(<LoginPage />);

    // Check that the main company link and heading are rendered
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('Leos jobbland.')).not.toBeNull();

    // Check that input fields are rendered with correct placeholders
    expect(screen.getByPlaceholderText('email-or-username')).not.toBeNull();
    expect(screen.getByPlaceholderText('password')).not.toBeNull();;

    // Check that the button is rendered
    expect(screen.getByRole('button')).not.toBeNull();
  });
});
