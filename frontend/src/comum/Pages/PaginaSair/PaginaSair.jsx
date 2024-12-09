import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './PaginaSair.css';
import ServicoAutenticacao from '../../servicos/api.js';
import api from '../../servicos/api.js';
import HamburgerMenu from "../../Componentes/Menu/HamburgerMenu";
import { useEffect, useState } from "react";

const PaginaSair = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 
    useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Nenhum usuário está logado!");
        navigate('/');
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        const responseUsuario = await api.get(`/api/usuarios/perfil`, { headers });
        setUser(responseUsuario.data?.usuario || responseUsuario.data); 
      } catch (error) {
        if (error.response?.status === 403) {
          toast.error("Acesso negado. Verifique suas credenciais.");
          navigate("/login");
        } else {
          toast.error("Erro ao carregar as informações do usuário.");
        }
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUserData();
  }, [navigate]); 
  const sair = () => {
    if (user) {
            if (user.carteira > 500) {
        toast.info('Você está com sorte! Não vá embora agora, aproveite para ganhar ainda mais!');
      } else {
        toast.info('Que tal tentar recuperar o que perdeu? Não desista agora!');
      }

            ServicoAutenticacao.sair();
      localStorage.removeItem('token');       toast.success('Você saiu com sucesso!');
      navigate('/');     } else {
      toast.error('Nenhum usuário está logado!');
      navigate('/');     }
  };

  return (
    <>
      <HamburgerMenu />

      <div className='logout-container'>
        <h1>Bem-vindo, {user?.nome || "Usuário"}!</h1>
        <p>Seu saldo atual: <strong>{user?.carteira || 0}</strong></p>
        <p>Deseja realmente sair?</p>
        <button 
          onClick={sair} 
          className='logout-button'
        >
          Sair
        </button>
      </div>
    </>
  );
};

export default PaginaSair;
