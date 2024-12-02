import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HamburgerMenu.css"; // Certifique-se de criar este arquivo para o estilo

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-button" onClick={toggleMenu}>
        ☰Menu
      </button>
      <div className={`menu-links ${menuOpen ? "active" : ""}`}>
        <Link to="/perfil">Perfil</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/inicio">Início</Link>
        <Link to="/jogar">JogoDoPato</Link>
        <Link to="/sair">Sair</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/ofertas">Ofertas</Link>
        <Link to="/roleta">RoletaDoPato</Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
