import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BtCadastrar from '../BtCadastrar/BtCadastrar';
import ServicoUsuarios from '../../servicos/ServicoUsuarios';
import { formatarComMascara, MASCARA_CELULAR } from '../../utils/mascaras';
import './InputCadastro.css';

const instanciaServicoUsuarios = new ServicoUsuarios();

const InputCadastro = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const cadastrar = () => {
    // Verificação de campos obrigatórios
    if (!nome) {
      toast.error('O campo Nome é obrigatório.');
      return;
    }
    if (!email) {
      toast.error('O campo Email é obrigatório.');
      return;
    }
    if (!telefone) {
      toast.error('O campo Telefone é obrigatório.');
      return;
    }
    if (!senha) {
      toast.error('O campo Senha é obrigatório.');
      return;
    }
    if (!confirmarSenha) {
      toast.error('O campo Confirmar Senha é obrigatório.');
      return;
    }

    // Verificação de senha
    if (senha !== confirmarSenha) {
      toast.error('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    // Objeto do usuário
    const usuario = {
      id: Date.now(),
      nome,
      email,
      telefone,
      senha,
      carteira: 500,
    };

    console.log('Usuário cadastrado:', usuario);

    try {
      // Cadastro do usuário
      instanciaServicoUsuarios.cadastrarUsuario(usuario);
      toast.success('Cadastro realizado com sucesso!');
      navigate('/'); // Redireciona após o cadastro
    } catch (error) {
      console.error('Erro ao realizar o cadastro:', error);
      if (error.message.includes('email')) {
        toast.error('Erro: Este email já está cadastrado.');
      } else if (error.message.includes('telefone')) {
        toast.error('Erro: Este telefone já está cadastrado.');
      } else {
        toast.error('Erro ao realizar o cadastro. Tente novamente.');
      }
    }
  };

  return (
    <div className='fundoImput'>
      <label className='titulo'>Nome</label>
      <input
        className='input'
        type="text"
        placeholder='Digite seu nome'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <label className='titulo'>Email</label>
      <input
        className='input'
        type="text"
        placeholder='Digite seu email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className='titulo'>Telefone</label>
      <input
        className='input'
        type="text"
        placeholder='Digite seu telefone'
        value={telefone}
        onChange={(e) => setTelefone(formatarComMascara(e.target.value, MASCARA_CELULAR))}
      />

      <label className='titulo'>Senha</label>
      <input
        className='input'
        type="password"
        placeholder='Crie sua senha'
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <label className='titulo'>Confirme sua senha</label>
      <input
        className='input'
        type="password"
        placeholder='Confirme sua senha'
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
      />

      <BtCadastrar onClick={cadastrar} />
      <Link to="/" className="link-cadastro">Já tem conta?</Link>
    </div>
  );
};

export default InputCadastro;
