import { Navigate } from 'react-router-dom';
import ServicoAutenticacao from './ServicoAutenticacao.js';

const RotaPrivada = ({ element: Element }) => {
  const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado();

  return usuarioLogado ? <Element /> : <Navigate to="/" />;
};

export default RotaPrivada;
