import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage.tsx';
import ApplicationPage from './pages/ApplicationPage.tsx';
import RecruiterPage from './pages/RecruiterPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import LandingPage from './pages/LandingPage.tsx';




/* This code snippet defines a functional component named `Root` that sets up routing for a React
application using React Router. Inside the `Root` component: */
function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/recruiter" element={<RecruiterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recruiter" element={<RecruiterPage />} />
        <Route path="/error" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default Root;