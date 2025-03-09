import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import Root from './Root.tsx'; // Import the Root component instead of App
import './i18n.ts';

/**
 * Initializes and renders the React application.
 *
 * Retrieves the DOM element with the id 'root' and creates a React root using createRoot.
 * The application is rendered within React.StrictMode to help identify potential issues/bugs,
 * and wrapped with AuthProvider to provide authentication context throughout the app (global variables).
 */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <Root /> {/* Render the Root component */}
    </AuthProvider>
  </StrictMode>
);