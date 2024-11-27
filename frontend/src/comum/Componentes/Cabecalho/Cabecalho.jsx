import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './Cabecalho.css';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';

function Cabecalho() {
  const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado(); // Use diretamente a instância

  return (
    <header className="cabeca">
      <Link to="/perfil" />
      <div className='foto'>
        {usuarioLogado && (
          <Link to="/perfil">
            <Avatar nome={usuarioLogado.nome} />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Cabecalho;
