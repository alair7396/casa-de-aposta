


import React from 'react';
import './BtJogar.css'; // Importa o arquivo de estilos

// Definindo os botões como componentes funcionais
const BtJogar = ({ onClick, texto }) => {
  return (
    <button onClick={onClick} className="BtJogar">
      {texto}
    </button>
  );
};







export default BtJogar;
