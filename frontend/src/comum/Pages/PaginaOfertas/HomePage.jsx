import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import api from '../../servicos/api'; import './HomePage.css';
import HamburgerMenu from '../../Componentes/Menu/HamburgerMenu';

function HomePage() {
  const [offers, setOffers] = useState([]);   const [user, setUser] = useState(null);   const [saldo, setSaldo] = useState(0); 
  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Você precisa estar logado para acessar esta página.');
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };

                const offersResponse = await api.get('/api/ofertas', { headers });
        setOffers(offersResponse.data);

                const responseUsuario = await api.get('/api/usuarios/perfil', { headers });
        setUser(responseUsuario.data);
        setSaldo(responseUsuario.data.carteira);
      } catch (error) {
        toast.error("Erro ao carregar os dados do servidor. Verifique sua conexão.");
        console.error("Erro ao carregar os dados do servidor:", error);
      }
    };

    loadData();
  }, []);

    const handleBuy = async (offer) => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      toast.error("Por favor, faça login para comprar.");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };

            const novoSaldo = saldo + parseInt(offer.quantidade);

            await api.post('/api/compras', { oferta_id: offer.id_oferta }, { headers });
            
            setSaldo(novoSaldo);
      const usuarioAtualizado = { ...user, carteira: novoSaldo };
      setUser(usuarioAtualizado);
      await api.put('/api/usuarios/saldo', { saldo: novoSaldo }, { headers }); 
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

            toast.success(`Compra concluída! Você comprou ${offer.quantidade} moedas. Seu novo saldo é de ${novoSaldo} moedas.`);
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
                  <img src={offer.imagem_url} alt="Pack de Moedas" className="offer-image" />
                  <p>Moedas: {offer.quantidade}</p>
                  <p>Preço: R${offer.valor}</p>
                  <button onClick={() => handleBuy(offer)} className="buy-button">
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
