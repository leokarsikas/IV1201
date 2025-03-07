import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import LandingPage from './pages/LandingPage.tsx';
import RecruiterPage from './pages/RecruiterPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Navbar from './components/navbar.tsx';
import ApplicationPage from './pages/ApplicationPage.tsx';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recruiter" element={<RecruiterPage />} />
        <Route path="/error" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default Root;