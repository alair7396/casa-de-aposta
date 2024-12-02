import React from 'react';
import './PaginaSobre.css';
import HamburgerMenu from '../../Componentes/Menu/HamburgerMenu';

const PaginaSobre = () => {
  return (  
    <>
      <HamburgerMenu/>
<div className='bodysobre'>
      <div className='navsobre'>
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
