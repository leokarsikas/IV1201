import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Presenter/LandingPagePresenter.tsx';
import ApplicationForm from './Presenter/ApplicationFormPresenter.tsx';
import Navbar from './Custom Components/navbar.tsx';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path="/register" element={<ApplicationForm />} />
        <Route path="/login" element={<ApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default Root;