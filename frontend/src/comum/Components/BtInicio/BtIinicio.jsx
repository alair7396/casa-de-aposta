


import React from 'react';
import './BtIinicio.css'; // Importa o arquivo de estilos

// Definindo os botões como componentes funcionais
const BtIinicio = ({ onClick, texto }) => {
  return (
    <button onClick={onClick} className="BtIinicio">
      {texto}
    </button>
  );
};







export default BtIinicio;
