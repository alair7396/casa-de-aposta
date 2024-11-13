import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error('As senhas não coincidem!');
      return;
    }

    const usuario = { nome, email, telefone, senha };
    console.log('Usuário cadastrado:', usuario);
    try {
      instanciaServicoUsuarios.cadastrarUsuario(usuario);
      toast.success('Cadastro realizado com sucesso!');
      navigate('/'); // Redireciona após o cadastro
    } catch (error) {
      toast.error('Erro ao realizar o cadastro. Tente novamente.');
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
    </div>
  );
};

export default InputCadastro;
