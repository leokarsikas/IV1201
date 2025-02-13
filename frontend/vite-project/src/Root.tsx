import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Presenter/LandingPagePresenter.tsx';
import RegistrationForm from './Presenter/RegistrationFormPresenter.tsx';
import LoginForm from './Presenter/LoginFormPresenter.tsx';
import Navbar from './Custom Components/navbar.tsx';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/application" element={<RegistrationForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default Root;