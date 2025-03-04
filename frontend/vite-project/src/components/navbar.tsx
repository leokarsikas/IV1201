import { NavLink, useNavigate } from "react-router-dom";
import "../styling/Navbar.css";
import { useAuth } from "../hooks/useAuthLogin";

const Navbar = () => {
  const { userName, logout } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <header className="navbar">
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
