import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './PaginaSair.css';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import HamburgerMenu from "../../Componentes/Menu/HamburgerMenu";

const PaginaSair = () => {
  const navigate = useNavigate();
  const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado();

  const sair = () => {
    if (usuarioLogado) {
      ServicoAutenticacao.sair();
      toast.success('Você saiu com sucesso!'); // Toast de sucesso
      navigate('/'); // Redireciona para a página de login
    } else {
      toast.error('Nenhum usuário está logado!'); // Toast de erro
      navigate('/'); // Redireciona para login mesmo assim
    }
  };

  return (
    <>
      <HamburgerMenu/>

      <div className='logout-container'>
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
