import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">ALURAFLIX</div>
      <nav>
        <Link to="/"><button>Home</button></Link>
        <Link to="/nuevo-video"><button>Nuevo Video</button></Link>
      </nav>
    </header>
  );
}

export default Header;
