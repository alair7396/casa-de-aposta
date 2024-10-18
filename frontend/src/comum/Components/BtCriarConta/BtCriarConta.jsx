
import React from 'react';
import './BtCriarConta.css';


// Definindo os botões como componentes funcionais
const BtCriarConta = ({ onClick , texto }) => {
  return (
    <button onClick={onClick} className="BtCriarConta">
      {texto}
    </button>
  );
};






export default BtCriarConta;
