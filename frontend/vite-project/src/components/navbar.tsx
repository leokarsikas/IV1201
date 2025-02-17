import { NavLink } from 'react-router-dom'
import '../styling/Navbar.css' 

const Navbar = () => {
  return (
    <header className="navbar">
      <nav className="navbar-container">
        
        <NavLink to="/" className="navbar-logo">
          Leos jobbland.
        </NavLink>
      
        <div className="navbar-links">
          <NavLink to="/login" className="navbar-button-login">
            Logga in
          </NavLink>
          <NavLink to="/register" className="navbar-button-register">
            Registrera
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
