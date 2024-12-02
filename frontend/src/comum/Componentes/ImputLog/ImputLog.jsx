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
      toast.error('Preencha todos os campos.'); // Mensagem de erro ao deixar campos vazios
      return;
    }

    try {
      const usuarioLogado = ServicoAutenticacao.login(usuario, senha);
      if (usuarioLogado) {
        toast.success(`Bem-vindo, ${usuario}! Login realizado com sucesso.`); // Mensagem de sucesso com o nome do usuário
        navigate('/inicio'); // Redireciona para a página inicial
      } else {
        toast.error('Usuário ou senha inválida. Tente novamente.'); // Mensagem de erro em caso de falha no login
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde.'); // Erro genérico para problemas no sistema
      console.error('Erro ao tentar realizar o login:', error);
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
