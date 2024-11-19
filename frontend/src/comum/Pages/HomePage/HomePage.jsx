import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Certifique-se de importar o Link
import ServicoUsuarios from '../../servicos/ServicoUsuarios';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import './HomePage.css';

const instanciaServicoUsuarios = new ServicoUsuarios();
const instanciaServicoAutenticacao = new ServicoAutenticacao();

function HomePage() {
  const [offers, setOffers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedOffers = JSON.parse(localStorage.getItem('offers') || '[]');
    setOffers(savedOffers);

    // Obtém o usuário logado no início
    const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();
    if (usuarioLogado) {
      setUser(usuarioLogado);
    }
  }, []);

  const handleBuy = (coins) => {
    if (!user) {
      alert("Por favor, faça login para comprar.");
      return;
    }

    const novoSaldo = user.carteira + parseInt(coins, 10);

    // Atualiza o saldo do usuário no serviço de usuários
    instanciaServicoUsuarios.atualizarSaldoUsuario(user.email, novoSaldo);

    // Atualiza o estado do saldo no componente e armazena no localStorage
    setUser({ ...user, carteira: novoSaldo });
    instanciaServicoAutenticacao.login(user.email, user.senha);  // Atualiza o usuário logado no localStorage

    alert(`Compra concluída! Seu novo saldo é de ${novoSaldo} moedas.`);
  };

  return (
    <>
    <nav className='nav'>
        <Link to='/sobre'>Sobre</Link> |  
        <Link to='/inicio'>Início</Link> |  
        <Link to='/perfil'>Perfil</Link> |  
        <Link to='/jogar'>Jogar</Link> |  
        <Link to='/sair'>Sair</Link> |  
        <Link to='/admin'>Admin</Link> |  
        <Link to='/roleta'>Roleta</Link>
      </nav>
    <div className='body'>
      {/* Barra de navegação */}
      
      
      {/* Ofertas de moedas */}
      <div className="nav">
        <h2>Ofertas de Moedas</h2>
        <p>Saldo da carteira: {user ? user.carteira : 0} moedas</p>
        
        <div className="offer-container">
          {offers.map((offer, index) => (
            <div key={index} className="offer-card">
              <img src={offer.image} alt="Pack de Moedas" className="offer-image" />
              <p>Moedas: {offer.coins}</p>
              <p>Preço: R${offer.price}</p>
              <button onClick={() => handleBuy(offer.coins)} className="buy-button">Comprar Agora</button>
            </div>
          ))}
        </div>
      </div>
    </div></>
  );
}

export default HomePage;
