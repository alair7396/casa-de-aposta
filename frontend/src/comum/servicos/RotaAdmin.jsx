import { Navigate } from 'react-router-dom';
import ServicoAutenticacao from './ServicoAutenticacao.js';

const RotaAdmin = ({ element: Element }) => {
  const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado();

  // Verifica se o usuário está logado e é um administrador
  if (usuarioLogado && usuarioLogado.role === 'admin') {
    return <Element />;
  }

  // Redireciona para a página inicial ou de login se não for admin
  return <Navigate to="/" />;
};

export default RotaAdmin;