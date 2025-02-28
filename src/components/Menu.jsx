import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Menu.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSalesDropdownOpen, setIsSalesDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSalesDropdown = () => {
    setIsSalesDropdownOpen(!isSalesDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsSalesDropdownOpen(false);
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
    <div ref={menuRef} className="menu-container">
      <button className="btn menu-toggle" onClick={toggleMenu}>
        {isOpen ? <i className="fas fa-times icon-white"></i> : <i className="fas fa-bars icon-black"></i>}
      </button>
      <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
        <button className="btn close-button" onClick={toggleMenu}>
          <i className="fas fa-times"></i>
        </button>
        <ul className="list-unstyled">
          <li><Link to="/" className="nav-link">Inicio</Link></li>
          <li><Link to="/clients" className="nav-link">Clientes</Link></li>
          <li><Link to="/inventory" className="nav-link">Inventario</Link></li>
          <li><Link to="/products" className="nav-link">Productos</Link></li>
          <li><Link to="/employees" className="nav-link">Empleados</Link></li>
          <li className="nav-item dropdown">
            <button className="btn nav-link dropdown-toggle" onClick={toggleSalesDropdown}>
              Ventas
            </button>
            <ul className={`dropdown-menu ${isSalesDropdownOpen ? 'show' : ''} shadow-sm`}>
              <li><Link to="/sales/create" className="dropdown-item">Crear Venta</Link></li>
              <li><Link to="/sales" className="dropdown-item">Ver Ventas</Link></li>
            </ul>
          </li>
          <li><Link to="/purchases" className="nav-link">Compras</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
