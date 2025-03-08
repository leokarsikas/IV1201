import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styling/Navbar.css";
import { useAuth } from "../hooks/useAuthLogin";

const Navbar = () => {
  const { userName, logout } = useAuth();
  const navigate = useNavigate();  //used for navigation of endpoints 
  /* This hook returns the current location
  object representing the current URL. It provides information about the current URL path, search,
  hash, and state. */
  const location = useLocation();

  /* `const isLandingPage = location.pathname === "/";` is checking if the current location pathname is
  equal to "/". If the current page is the landing page (home page), the variable `isLandingPage`
  will be set to `true`, otherwise it will be set to `false`.*/
  const isLandingPage = location.pathname === "/";

/**
 * The `handleLogout` function logs the user out and navigates to the home page.
 */
  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <header className={`navbar ${isLandingPage ? "navbar-landing" : "navbar-default"}`}>
      <nav className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Leos jobbland.
        </NavLink>

        <div className="navbar-links">
          {userName ? (
            <>
              <NavLink to="/profile" className="navbar-button-username">
                {userName}
              </NavLink>
              <button onClick={handleLogout} className="navbar-button-register">
                Logga ut
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar-button-login">
                Logga in
              </NavLink>
              <NavLink to="/register" className="navbar-button-register">
                Registrera
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
