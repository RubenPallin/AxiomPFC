import { useState } from 'react';
import './Header.css'; // Estilos para la cabecera
import carritoImg from '../../assets/carrito.png'; // Importa la imagen del carrito
import { Link } from 'react-router-dom';


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <a href="/mainAxiom">Axiom</a>
        </div>

        {/* Menú lateral */}
        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="/mainAxiom">Inicio</a></li>
            <li><Link to="/products">Productos</Link></li>
            <li><a href="/offers">Ofertas</a></li>
          </ul>
        </nav>

        {/* Icono del carrito */}
        <div className="cart-icon">
          <a href="/cart">
            <img src={carritoImg} alt="Carrito" />
          </a>
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