


import React from 'react';
import './BtPerfil.css'; // Importa o arquivo de estilos

// Definindo os botões como componentes funcionais
const BtPerfil = ({ onClick, texto }) => {
  return (
    <button onClick={onClick} className="BtPerfil">
      {texto}
    </button>
  );
};







export default BtPerfil;












