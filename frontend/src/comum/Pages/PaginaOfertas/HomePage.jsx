import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import ServicoUsuarios from '../../servicos/ServicoUsuarios';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import './HomePage.css';
import HamburgerMenu from '../../Componentes/Menu/HamburgerMenu';

const instanciaServicoUsuarios = new ServicoUsuarios();

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
      toast.error("Erro ao buscar o saldo.");
    }
  };

  // Função para comprar moedas
  const handleBuy = async (coins) => {
    if (!user) {
      toast.error("Por favor, faça login para comprar.");
      return;
    }

    try {
      // Busca o saldo atualizado no serviço
      const saldoAtual = await instanciaServicoUsuarios.obterSaldoUsuario(user.email);

      // Verifica se o saldo é suficiente
      if (saldoAtual < parseInt(coins, 10)) {
        toast.error("Saldo insuficiente para realizar a compra.");
        return;
      }

      // Calcula o novo saldo
      const novoSaldo = saldoAtual + parseInt(coins, 10);

      // Atualiza o saldo no serviço
      await instanciaServicoUsuarios.atualizarSaldoUsuario(user.email, novoSaldo);

      // Atualiza o estado local e no localStorage
      setSaldo(novoSaldo);
      const usuarioAtualizado = { ...user, carteira: novoSaldo };
      setUser(usuarioAtualizado);  // Atualiza o estado do usuário sem precisar chamar login

      // Exibe a mensagem de sucesso
      toast.success(`Compra concluída! Você comprou ${coins} moedas. Seu novo saldo é de ${novoSaldo} moedas.`);
    } catch (error) {
      console.error("Erro ao processar a compra:", error);
      toast.error("Ocorreu um erro ao processar a compra.");
    }
  };

  return (
    <>
      <HamburgerMenu />

      <div className='bodyoferta'>
        {/* Exibição do saldo e ofertas */}
        <div className="fundoImputoferta">
          <h2 className='coloroferta'>Ofertas de Moedas</h2>
          <p className='legendaoferta'>
            <strong className='coloroferta'>Saldo da carteira:</strong> {saldo} moedas
          </p>

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
              <p>Não há ofertas disponíveis no momento.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
