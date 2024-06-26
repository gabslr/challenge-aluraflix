import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="logo">
        <Link to="/">
          <img src="/imagenes/Logo.svg" alt="ALURAFLIX Logo" className="logo-image" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
