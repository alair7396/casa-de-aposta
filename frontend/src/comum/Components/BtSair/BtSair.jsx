


import React from 'react';
import './BtSair.css'; // Importa o arquivo de estilos

// Definindo os botões como componentes funcionais
const BtSair = ({ onClick, texto }) => {
  return (
    <button onClick={onClick} className="BtSair">
      {texto}
    </button>
  );
};









export default BtSair;
