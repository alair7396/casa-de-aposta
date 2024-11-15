import React from 'react';
import './PaginaSobre.css';
import { Link } from 'react-router-dom';

const PaginaSobre = () => {
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

      <div className='nav'>
        <h2 className='page-title'>Sobre o Jogo</h2>
        <p className='page-text'>
          Este jogo é uma roleta interativa onde você pode testar sua sorte com diferentes opções. A cada rodada, você tem a chance de ganhar prêmios emocionantes!
        </p>
      </div>
    </>
  );
};

export default PaginaSobre;
