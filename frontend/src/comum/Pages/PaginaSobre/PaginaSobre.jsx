import React from 'react';
import './PaginaSobre.css';
import { Link } from 'react-router-dom';

const PaginaSobre = () => {
  return (  
    <>
      <nav className='nav'>  
        <Link to='/inicio'>Início</Link> |  
        <Link to='/perfil'>Perfil</Link> |  
        <Link to='/jogar'>Jogar</Link> |  
        <Link to='/sair'>Sair</Link> |  
        <Link to='/admin'>Admin</Link> |  
        <Link to='/home'>Home</Link>|
        <Link to='/roleta'>Roleta</Link>
      </nav>
<div className='body'>
      <div className='nav'>
        <h2 >Sobre o Jogo</h2>
        <p >
          Este jogo é uma roleta interativa onde você pode testar sua sorte com diferentes opções. A cada rodada, você tem a chance de ganhar prêmios emocionantes!
        </p>
      </div>
    </div>
    </>
  );
};

export default PaginaSobre;
