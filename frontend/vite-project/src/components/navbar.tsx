import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styling/Navbar.css";
import { useAuth } from "../hooks/useAuthLogin";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  /**
   * Retrieves authentication state and logout function from the authentication context.
   * @constant {string | null} userName - The authenticated user's username.
   * @constant {Function} logout - Function to log out the user.
   */
  const { userName, logout } = useAuth();
  /**
   * Retrieves translation functions from the i18n library.
   * @constant {Function} t - Function to retrieve translated text.
   * @constant {Function} changeLanguage - Function to switch languages.
   */
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();
  /**
   * Navigation hook to enable programmatic navigation.
   * @constant {Function} navigate - Function to navigate between routes.
   */
  const navigate = useNavigate(); //used for navigation of endpoints

  const location = useLocation();

  /**
   * Determines if the current page is the landing page.
   *
   * @constant {boolean} isLandingPage - Indicates if the current path is `/`.
   */
  const isLandingPage = location.pathname === "/";

  /**
   * Logs the user out and navigates to the home page.
   *
   * @function handleLogout
   */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`navbar ${
        isLandingPage ? "navbar-landing" : "navbar-default"
      }`}
    >
      <nav className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Leos jobbland.
        </NavLink>

        <div className="navbar-links">
          {userName ? (
            <>
              <p className="navbar-button-username">{userName}</p>
              <button onClick={handleLogout} className="navbar-button-register">
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar-button-login">
                {t("login")}
              </NavLink>
              <NavLink to="/register" className="navbar-button-register">
                {t("register")}
              </NavLink>
            </>
          )}
        </div>
        <button
          onClick={() => changeLanguage("sv")}
          className="navbar-button-lang"
        >
          🇸🇪 Svenska
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className="navbar-button-lang"
        >
          🇬🇧 English
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
