import React from 'react';
import '../styling/ErrorPage.css';

const ErrorPage: React.FC = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="error-svg"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="error-title">Something Went Wrong</h1>
        <p className="error-message">
          We apologize for the inconvenience. Please try again later or contact support if the issue persists.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="error-reload-button"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;