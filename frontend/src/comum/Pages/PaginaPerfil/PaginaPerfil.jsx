import { Link, useNavigate } from 'react-router-dom';



import { useState, useEffect } from 'react';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import Avatar from '../../Componentes/Avatar/Avatar';

 ServicoAutenticacao;

const PaginaPerfil = () => {
  const navigate = useNavigate();
  const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado();

  const [imagemUsuario, setImagemUsuario] = useState('');
  const [saldo, setSaldo] = useState(0);

  // Recupera a imagem do avatar e o saldo do usuário ao carregar o componente
  useEffect(() => {
    const avatarSalvo = localStorage.getItem('avatarUsuario');
    if (avatarSalvo) {
      setImagemUsuario(avatarSalvo);
    }

    if (usuarioLogado && usuarioLogado.carteira) {
      setSaldo(usuarioLogado.carteira);
    }
  }, [usuarioLogado]);

 

  const mudarAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64String = event.target.result;
        setImagemUsuario(base64String);

        // Salva a imagem no localStorage
        localStorage.setItem('avatarUsuario', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    <nav className='nav'> 
        <Link to='/sobre'>Sobre</Link> |  
        <Link to='/inicio'>Início</Link> |   
        <Link to='/jogar'>Jogar</Link> |  
        <Link to='/sair'>Sair</Link> |  
        <Link to='/admin'>Admin</Link> |  
        <Link to='/home'>Home</Link>|
        <Link to='/roleta'>Roleta</Link>
      </nav>
    <div className='body'>
    <div className='nav'>
    <div titulo="Meu Perfil" voltarPara="/">
      <input
        type="file"
        accept="image/*"
        multiple={false}
        id="fileInput"
        style={{ display: 'none' }}
        onChange={mudarAvatar}
      />
      <button
        onClick={() => document.getElementById('fileInput').click()}
        style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', justifyContent: 'center' }}
      >
        <Avatar nome={usuarioLogado.nome} perfil={true} imagem={imagemUsuario} />
      </button>

      <div className="campo">
        <label>Nome</label>
        <input type="text" value={usuarioLogado.nome} disabled />
      </div>

      <div className="campo">
        <label>Email</label>
        <input type="text" value={usuarioLogado.email} disabled />
      </div>

      <div className="campo">
        <label>Saldo da Carteira</label>
        <input type="text" value={`$ ${saldo}`} disabled />
      </div>

     
    </div>
    </div></div>
    </>
  );
};

export default PaginaPerfil;
