import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onNuevoVideoClick }) {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/imagenes/Logo.svg" alt="ALURAFLIX Logo" className="logo-image" />
        </Link>
      </div>
      <nav>
        <Link to="/"><button>Home</button></Link>
        <button onClick={onNuevoVideoClick}>Nuevo Video</button>
      </nav>
    </header>
  );
}

export default Header;
