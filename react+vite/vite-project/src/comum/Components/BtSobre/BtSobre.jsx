




import React from 'react';
import './BtSobre.css'; // Importa o arquivo de estilos

// Definindo os botões como componentes funcionais
const BtSobre= ({ onClick, texto }) => {
  return (
    <button onClick={onClick} className="BtSobre">
      {texto}
    </button>
  );
};











export default BtSobre;
