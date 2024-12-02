import React from 'react';
import './PaginaRoleta.css';
import Roleta from '../../Componentes/Roleta/Roleta';
import HamburgerMenu from '../../Componentes/Menu/HamburgerMenu';

const PaginaRoleta = () => {
  return (  
    <>
      <HamburgerMenu/>
      <div className='body'>
        <Roleta/> 
      </div>
    </>
  );
};

export default PaginaRoleta;
