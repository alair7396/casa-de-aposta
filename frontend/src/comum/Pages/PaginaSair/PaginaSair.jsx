import { Link, useNavigate } from "react-router-dom";
import './PaginaSair.css'; // Importando o arquivo CSS
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';

const PaginaSair = () => {
  const navigate = useNavigate();

  const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado();

  const sair = () => {
    if (usuarioLogado) {
      ServicoAutenticacao.sair();
      alert('Você saiu com sucesso!'); // Mensagem de feedback
      navigate('/'); // Redireciona para a página de login
    } else {
      alert('Nenhum usuário logado!'); // Mensagem de erro
      navigate('/'); // Redireciona mesmo assim
    }
  };

  return (
    <>
      <nav className='nav'>
      |<Link to='/perfil'>Perfil</Link> |  
        |<Link to='/sobre'>Sobre</Link> |  
        |<Link to='/inicio'>Início</Link> |   
        |<Link to='/jogar'>Jogar</Link> |  
        |<Link to='/sair'>Sair</Link> |
        |<Link to='/admin'>Admin</Link> |
        |<Link to='/ofertas'>Ofertas</Link>|
        |<Link to='/roleta'>Roleta</Link>|
      </nav>

      <div className='body'>
        <h1>Bem-vindo, {usuarioLogado?.nome || 'Visitante'}!</h1>
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
