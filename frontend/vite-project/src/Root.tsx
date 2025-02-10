import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Presenter/LandingPagePresenter.tsx';
import ApplicationForm from './Presenter/ApplicationFormPresenter.tsx';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/application" element={<ApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default Root;