import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage.tsx';
import ApplicationPage from './pages/ApplicationPage.tsx';
import RecruiterPage from './pages/RecruiterPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import LandingPage from './pages/LandingPage.tsx';


/**
 * This `Root` component sets up the routing for the React application using React Router. 
 * Inside the `Root` component:
 * Each imported component have their corresponding endpoint path. 
*/
function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/recruiter" element={<RecruiterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default Root;