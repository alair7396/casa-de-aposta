import './ImputLog.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BtEntrar from '../BtEntrar/BtEntrar';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';

ServicoAutenticacao;

const ImputLog = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = () => {
    if (!usuario || !senha) {
      toast.error('Preencha todos os campos.');
      return;
    }

    const usuarioLogado = ServicoAutenticacao.login(usuario, senha);
    if (usuarioLogado) {
      toast.success('Login realizado com sucesso!');
      navigate('/roleta'); // Redireciona para a página inicial
    } else {
      toast.error('Usuário ou senha inválida.');
    }
  };

  return (
    <div className='fundoImput'>
      <label className='titulo'>Email</label>
      <input
        className='input'
        type="text"
        placeholder='Digite seu usuário'
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <label className='titulo'>Senha</label>
      <input
        className='input'
        type="password"
        placeholder='Digite sua senha'
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <BtEntrar onClick={entrar} />
      <Link to="/cadastro" className="link-cadastro">Ainda não tem conta?</Link>
    </div>
  );
};

export default ImputLog;
