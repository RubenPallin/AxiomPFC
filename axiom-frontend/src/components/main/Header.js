import { useState } from 'react';
import './Header.css';
import carritoImg from '../../assets/carrito.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/mainAxiom">Axiom</Link>
        </div>

        {/* Menú lateral */}
        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/mainAxiom">Inicio</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/info">Acerca de Axiom</Link></li>
          </ul>
        </nav>

        {/* Icono del carrito y bienvenida/logout */}
        <div className="right-section">
          <div className="cart-icon">
            <Link to="/cart">
              <img src={carritoImg} alt="Carrito" />
            </Link>
          </div>
          {user ? (
            <div className="user-section">
              <span className="welcome-message">Bienvenido, {user.name}</span>
              <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link">Iniciar Sesión</Link>
              <Link to="/register" className="auth-link">Registrarse</Link>
            </div>
          )}
        </div>

        {/* Botón para abrir/cerrar el menú en móvil */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <button>☰</button>
        </div>
      </div>
    </header>
  );
}

export default Header;