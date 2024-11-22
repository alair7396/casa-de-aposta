import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './Cabecalho.css';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';

const instanciaServicoAutenticacao = new ServicoAutenticacao();

function Cabecalho() {
  const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

  return (
    <header className="cabeca">
      <Link to="/perfil" >
        
      </Link>
<div className='foto'>{usuarioLogado && (
        <Link to="/perfil">
          <Avatar nome={usuarioLogado.nome} />
        </Link>
      )}</div>
      
    </header>
  );
}

export default Cabecalho;

