import './ImputLog.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BtEntrar from '../BtEntrar/BtEntrar';
import api from '../../servicos/api';

const ImputLog = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = async () => {
    if (!usuario || !senha) {
      toast.error('Preencha todos os campos.');
      return;
    }

    try {
      // Faz a requisição para autenticar o usuário
      const response = await api.post(
        '/api/usuarios/login',
        { email: usuario, senha },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token, usuario: usuarioLogado } = response.data;

      // Armazenar o token de autenticação no localStorage
      localStorage.setItem('token', token);

      toast.success(`Bem-vindo, ${usuarioLogado.nome}! Login realizado com sucesso.`);
      navigate('/inicio');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Usuário ou senha inválida. Tente novamente.');
      } else {
        toast.error('Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde.');
      }
      console.error('Erro ao tentar realizar o login:', error);
    }
  };

  return (<>
    <div className='fundoInput'>
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
     <div className="mascote-container">
     <img
       src="/icons/duck_transparent-removebg-preview.png"
       alt="Mascote"
       className="mascote-img"
     />
   </div>
   </>
  );
};

export default ImputLog;
