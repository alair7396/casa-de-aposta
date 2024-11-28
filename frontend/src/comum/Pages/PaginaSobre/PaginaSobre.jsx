import React from 'react';
import './PaginaSobre.css';
import { Link } from 'react-router-dom';

const PaginaSobre = () => {
  return (  
    <>
      <nav className='nav'>  
        |<Link to='/perfil'>Perfil</Link> |  
        |<Link to='/sobre'>Sobre</Link> |  
        |<Link to='/inicio'>Início</Link> |   
        |<Link to='/jogar'>Jogar</Link> |  
        |<Link to='/sair'>Sair</Link> |
        |<Link to='/admin'>Admin</Link> |
        |<Link to='/ofertas'>Ofertas</Link>|
        |<Link to='/roleta'>Roleta</Link>|
      </nav>
<div className='body'>
      <div className='nav'>
        <h2 >Sobre o App</h2>
        <p>
    Conheça o <strong>LuckDuck</strong>, um app que não esconde
     suas intenções: <em>aqui, o pato é você</em>. Desenvolvido
      como projeto do curso técnico de Desenvolvimento de Sistemas
       do SENAI, o <strong>LuckDuck</strong> apresenta dois jogos, 
       incluindo uma roleta, onde o objetivo é claro – perder.
        Talvez seja uma sátira aos jogos de azar, talvez seja 
        só mais uma forma de explorar os incautos. Afinal,
         quem disse que o desenvolvedor não pode se divertir
          às custas de quem insiste em tentar a sorte?
</p>

      </div>
    </div>
    </>
  );
};

export default PaginaSobre;
