import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Menu.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className={`menu-container ${isOpen ? 'menu-open' : ''}`}>
      <button className="btn menu-toggle" onClick={toggleMenu}>
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
      
      <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
        <button className="btn close-button" onClick={toggleMenu}>
          <i className="fas fa-times"></i>
        </button>
        <ul className="list-unstyled">
          <li><Link to="/" className="nav-link"><i className="fas fa-house-chimney"></i> Inicio</Link></li>
          <li><Link to="/clients" className="nav-link"><i className="fas fa-user-group"></i> Clientes</Link></li>
          <li><Link to="/inventory" className="nav-link"><i className="fas fa-box-open"></i> Inventario</Link></li>
          <li><Link to="/products" className="nav-link"><i className="fas fa-tags"></i> Productos</Link></li>
          <li><Link to="/employees" className="nav-link"><i className="fas fa-user-tie"></i> Empleados</Link></li>
          <li><Link to="/sales" className="nav-link"><i className="fas fa-cart-shopping"></i> Ventas</Link></li>
          <li><Link to="/purchases" className="nav-link"><i className="fas fa-receipt"></i> Compras</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
