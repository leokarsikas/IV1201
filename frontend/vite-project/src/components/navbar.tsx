import { NavLink } from 'react-router-dom'
import '../styling/Navbar.css' 
import { useAuth } from "../hooks/useAuthLogin";

const Navbar = () => {
  const { user,  logout } = useAuth();
  console.log("test for frontend-deploy branch");
  return (
    <header className="navbar">
      <nav className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Leos jobbland.
        </NavLink>

        <div className="navbar-links">
          {user ? (
            <>
              <NavLink to="/profile" className="navbar-button-username">
                {user} 
              </NavLink>
              <button onClick={logout} className="navbar-button-register">
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


export default Navbar
