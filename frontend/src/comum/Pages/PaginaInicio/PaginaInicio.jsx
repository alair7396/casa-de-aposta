import React from 'react';
import './PaginaInicio.css';
import { Link } from 'react-router-dom';

const PaginaInicio = () => {
  return (  
    <>
      <nav className='nav'> 
        <Link to='/sobre'>Sobre</Link> |    
        <Link to='/perfil'>Perfil</Link> |  
        <Link to='/jogar'>Jogar</Link> |  
        <Link to='/sair'>Sair</Link> |  
        <Link to='/admin'>Admin</Link> |  
        <Link to='/home'>Home</Link>|
        <Link to='/roleta'>Roleta</Link>
      </nav>

      <div className='body'>
        
        <p className='nav'>
          <h2 >Bem-vindo ao Início!</h2>Aqui você começa sua jornada no nosso site. Explore as opções e divirta-se.
        </p>
      </div>
    </>
  );
};

export default PaginaInicio;
