import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BtCadastrar from '../BtCadastrar/BtCadastrar';
import api from '../../servicos/api.js';
import { formatarComMascara, MASCARA_CELULAR } from '../../utils/mascaras';
import './InputCadastro.css';

const InputCadastro = () => {
  const navigate = useNavigate();

    const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const cadastro = async () => {
        if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      toast.error('Todos os campos são obrigatórios.');
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error('As senhas não coincidem.');
      return;
    }

        const usuario = {
      nome,
      email,
      telefone,
      senha,
     
    };

    try {
            await api.post('/api/usuarios/cadastro', usuario, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Cadastro realizado com sucesso!');
      navigate('/');     } catch (error) {
      console.error('Erro ao realizar o cadastro:', error);

            const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';

      if (errorMessage.includes('email')) {
        toast.error('Erro: Este email já está cadastrado.');
      } else if (errorMessage.includes('telefone')) {
        toast.error('Erro: Este telefone já está cadastrado.');
      } else {
        toast.error('Erro ao realizar o cadastro.');
      }
    }
  };

  return (
    <div className="fundoImput">
      <label className="titulo">Nome</label>
      <input
        className="input"
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <label className="titulo">Email</label>
      <input
        className="input"
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="titulo">Telefone</label>
      <input
        className="input"
        type="text"
        placeholder="Digite seu telefone"
        value={telefone}
        onChange={(e) => setTelefone(formatarComMascara(e.target.value, MASCARA_CELULAR))}
      />

      <label className="titulo">Senha</label>
      <input
        className="input"
        type="password"
        placeholder="Crie sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <label className="titulo">Confirme sua senha</label>
      <input
        className="input"
        type="password"
        placeholder="Confirme sua senha"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
      />

      <BtCadastrar onClick={cadastro} />
      <Link to="/" className="link-cadastro">Já tem conta?</Link>
    </div>
  );
};

export default InputCadastro;
