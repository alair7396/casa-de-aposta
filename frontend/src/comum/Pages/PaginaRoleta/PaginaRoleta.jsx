import React from 'react';
import './PaginaRoleta.css';
import Roleta from '../../Componentes/Roleta/Roleta';
import { Link } from 'react-router-dom';

const PaginaRoleta = () => {
  return (  
    <>
      <nav className='nav'> 
        <Link to='/sobre'>Sobre</Link> |  
        <Link to='/inicio'>Início</Link> |  
        <Link to='/perfil'>Perfil</Link> |  
        <Link to='/jogar'>Jogar</Link> |  
        <Link to='/sair'>Sair</Link> |  
        <Link to='/admin'>Admin</Link> |  
        <Link to='/home'>Home</Link>
      </nav>
      <div className='body'>
        <Roleta/> 
      </div>
    </>
  );
};

export default PaginaRoleta;
