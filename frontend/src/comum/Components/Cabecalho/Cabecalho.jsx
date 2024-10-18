
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BtCriarConta from '../BtCriarConta/BtCriarConta';
import BtEntrar from '../BtEntrar/BtEntrar';
import BtIinicio from '../BtInicio/BtIinicio';
import BtJogar from '../BtJogar/BtJogar';
import BtPerfil from '../BtPerfil/BtPerfil';
import BtSair from '../BtSair/BtSair';
import BtSobre from '../BtSobre/BtSobre';
import './Cabecalho.css';

const Cabecalho = () => {
    const navigate = useNavigate(); // Hook para navegação
  
    return (
      <header className="Cabecalho">
        <BtIinicio onClick={() => navigate('/inicio')} texto="Início" />
        <BtSobre onClick={() => navigate('/sobre')} texto="Sobre" />
        <BtPerfil onClick={() => navigate('/perfil')} texto="Perfil" />
        <BtJogar onClick={() => navigate('/jogar')} texto="Jogar" />
        <BtCriarConta onClick={() => navigate('/criar-conta')} texto="Criar Conta" />
        <BtEntrar onClick={() => navigate('/entrar')} texto="Entrar" />
        <BtSair onClick={() => navigate('/sair')} texto="Sair" />
      </header>
    );
  };


export default Cabecalho ;
