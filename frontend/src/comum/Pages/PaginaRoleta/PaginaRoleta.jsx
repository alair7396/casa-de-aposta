

import React from 'react';


import './PaginaRoleta.css';
import Roleta from '../../Componentes/Roleta/Roleta';
import { Link } from 'react-router-dom';

const PaginaRoleta = () => {
  return (  
    <>
    <nav className='nav'> 
                <Link to='/sobre'>Sobre</Link> |  
            </nav>
            <div className='body'>
      <Roleta/> 
    </div>
    </>
    
  
  );
};

export default PaginaRoleta;
