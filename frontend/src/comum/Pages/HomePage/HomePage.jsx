import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Certifique-se de importar o Link
import ServicoUsuarios from '../../servicos/ServicoUsuarios';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import './HomePage.css';

const instanciaServicoUsuarios = new ServicoUsuarios();
ServicoAutenticacao;

function HomePage() {
  const [offers, setOffers] = useState([]); // Ofertas disponíveis
  const [user, setUser] = useState(null); // Usuário logado
  const [saldo, setSaldo] = useState(0); // Saldo atualizado da carteira

  // Carregar ofertas e usuário logado
  useEffect(() => {
    const savedOffers = JSON.parse(localStorage.getItem('offers') || '[]');
    setOffers(savedOffers);

    // Busca o usuário logado no localStorage
    const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado();
    if (usuarioLogado) {
      setUser(usuarioLogado);
      atualizarSaldo(usuarioLogado.email); // Atualiza o saldo do serviço
    }
  }, []);

  // Função para buscar e atualizar o saldo do usuário
  const atualizarSaldo = async (email) => {
    try {
      const saldoAtual = await instanciaServicoUsuarios.obterSaldoUsuario(email);
      setSaldo(saldoAtual); // Atualiza o saldo no estado
    } catch (error) {
      console.error("Erro ao buscar o saldo:", error);
    }
  };

  // Função para comprar moedas
  const handleBuy = async (coins) => {
    if (!user) {
      alert("Por favor, faça login para comprar.");
      return;
    }

    try {
      // Busca o saldo atualizado no serviço
      const saldoAtual = await instanciaServicoUsuarios.obterSaldoUsuario(user.email);

      // Calcula o novo saldo
      const novoSaldo = saldoAtual + parseInt(coins, 10);

      // Atualiza o saldo no serviço
      await instanciaServicoUsuarios.atualizarSaldoUsuario(user.email, novoSaldo);

      // Atualiza o estado local e no localStorage
      setSaldo(novoSaldo);
      const usuarioAtualizado = { ...user, carteira: novoSaldo };
      setUser(usuarioAtualizado);
      instanciaServicoAutenticacao.login(user.email, user.senha); // Atualiza o usuário no localStorage

      alert(`Compra concluída! Seu novo saldo é de ${novoSaldo} moedas.`);
    } catch (error) {
      console.error("Erro ao processar a compra:", error);
      alert("Ocorreu um erro ao processar a compra.");
    }
  };

  return (
    <>
      {/* Barra de navegação */}
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
        {/* Exibição do saldo e ofertas */}
        <div className="fundoImput">
          <h2 className='color'>Ofertas de Moedas</h2>
          <p className='legenda'><strong className='color'>Saldo da carteira:</strong> {saldo} moedas</p>

          <div className="offer-container">
            {offers.length > 0 ? (
              offers.map((offer, index) => (
                <div key={index} className="offer-card">
                  <img src={offer.image} alt="Pack de Moedas" className="offer-image" />
                  <p>Moedas: {offer.coins}</p>
                  <p>Preço: R${offer.price}</p>
                  <button onClick={() => handleBuy(offer.coins)} className="buy-button">
                    Comprar Agora
                  </button>
                </div>
              ))
            ) : (
              <p >Não há ofertas disponíveis no momento.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

