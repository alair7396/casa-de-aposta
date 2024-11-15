import React from 'react';
import './PaginaInicio.css';
import { Link } from 'react-router-dom';

const PaginaInicio = () => {
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
        <h2 className='page-title'>Bem-vindo ao Início!</h2>
        <p className='page-text'>
          Aqui você começa sua jornada no nosso site. Explore as opções e divirta-se.
        </p>
      </div>
    </>
  );
};

export default PaginaInicio;
