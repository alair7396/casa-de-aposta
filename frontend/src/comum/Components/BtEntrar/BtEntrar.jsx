

import React from 'react';
import './BtEntrar.css'; // Importa o arquivo de estilos

// Definindo os botões como componentes funcionais
const BtEntrar = ({ onClick, texto }) => {
  return (
    <button onClick={onClick} className="bBtEntrar">
      {texto}
    </button>
  );
};






export default BtEntrar;
