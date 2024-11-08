

import React from 'react';


import './PaginaRoleta.css';
import Roleta from '../../Componentes/Roleta/Roleta';

const PaginaRoleta = () => {
  return (
   
      <div className="pagina-roleta-container">
        <div className="pagina-roleta-roleta">
          <Roleta/>
        </div>
      </div>
    
  );
};

export default PaginaRoleta;
