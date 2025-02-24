import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import Root from './Root.tsx'; // Import the Root component instead of App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <Root /> {/* Render the Root component */}
    </AuthProvider>
  </StrictMode>
);