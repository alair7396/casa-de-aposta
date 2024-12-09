import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../servicos/api.js';
import './AdminPage.css';
import HamburgerMenu from '../../Componentes/Menu/HamburgerMenu';
import { toast } from "react-toastify";

function AdminPage() {
  const [pack, setPack] = useState({ imagem_url: '', quantidade: '', valor: '' });
  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Você precisa estar logado para acessar esta página.');
        return;
      }
            try {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuarioLogado) {
          toast.error('Acesso negado. Você não tem permissão para acessar esta página.');
          navigate('/inicio');
          return;
        }
  
                const response = await api.get(`/api/usuarios/${usuarioLogado.id_usuario}`);
        if (response.status === 404) {
          console.error('Erro 404: Usuário não encontrado.');
        }
  
        if (response.data.papel !== 'admin') {
          toast.error('Acesso negado. Você não tem permissão para acessar esta página.');
          navigate('/inicio');
          return;
        }
      } catch (error) {
        console.error('Erro ao verificar permissões do usuário:', error);
        toast.error('Erro ao verificar permissões do usuário.');
        navigate('/inicio');
      }
  
            try {
        const headers = { Authorization: `Bearer ${token}` };
        const offersResponse = await api.get('/api/ofertas', { headers });

        const usersResponse = await api.get('/api/usuarios', { headers });

        const purchasesResponse = await api.get('/api/compras', { headers });
  
        if (usersResponse.status === 404) {
          console.error('Erro 404: Usuários não encontrados.');
        }
  
        setOffers(offersResponse.data);
        setUsers(usersResponse.data);
        setPurchases(purchasesResponse.data);
      } catch (error) {
        console.error('Erro ao carregar os dados do servidor:', error);
        toast.error('Erro ao carregar os dados do servidor.');
      }
    };
    loadData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPack((prevPack) => ({ ...prevPack, [name]: value }));
  };

  const handleAddOffer = async () => {
    try {
      console.log('Dados do pack sendo enviados:', pack);
  
            if (!pack.imagem_url || !pack.quantidade || !pack.valor) {
        toast.error('Todos os campos são obrigatórios para adicionar ou editar uma oferta.');
        return;
      }
  
            const imagemUrl = pack.imagem_url.trim();
      if (imagemUrl.includes(' ')) {
        toast.error('O URL da imagem não deve conter espaços.');
        return;
      }
  
            if (isNaN(Number(pack.quantidade)) || isNaN(Number(pack.valor))) {
        toast.error('Quantidade e valor devem ser números válidos.');
        return;
      }
  
            if (Number(pack.quantidade) <= 0 || Number(pack.valor) <= 0) {
        toast.error('Quantidade e valor devem ser maiores que zero.');
        return;
      }
  
            const newOffer = {
        imagem_url: imagemUrl,
        quantidade: Number(pack.quantidade),         valor: Number(pack.valor),         id_oferta: pack.id_oferta       };
  
      if (pack.id_oferta) {
                const response = await api.patch(`/api/ofertas/editar`, newOffer);
        if (response.status === 200) {
          toast.success('Oferta atualizada com sucesso!');
        }
      } else {
                const response = await api.post('/api/ofertas/criar', newOffer);
        if (response.status === 201) {
          toast.success('Oferta adicionada com sucesso!');
        }
      }
  
            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      const updatedOffersResponse = await api.get('/api/ofertas', { headers });
      setOffers(updatedOffersResponse.data);
  
            setPack({ imagem_url: '', quantidade: '', valor: '' });
    } catch (error) {
      console.error('Erro ao adicionar/atualizar oferta:', error);
      if (error.response && error.response.status === 400) {
        toast.error('Erro 400: Dados inválidos. Verifique os dados e tente novamente.');
      } else {
        toast.error('Erro ao adicionar/atualizar oferta. Verifique os dados e tente novamente.');
      }
    } finally {
            console.log('Processo de adicionar/atualizar oferta finalizado.');
    }
};

  const handleDeleteOffer = async (id_oferta) => {
    try {
      await api.delete(`/api/ofertas/${id_oferta}`);
      toast.success('Oferta excluída com sucesso!');
      
            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      const updatedOffersResponse = await api.get('/api/ofertas', { headers });
      setOffers(updatedOffersResponse.data);
    } catch (error) {
      toast.error('Erro ao excluir a oferta.');
    }
  };

  const handleDeleteUser = async (id_usuario) => {
    const confirmation = window.confirm('Você tem certeza que deseja excluir este usuário?');
    if (confirmation) {
      try {
        await api.delete(`/api/usuarios/${id_usuario}`);
        setUsers(users.filter((user) => user.id_usuario !== id_usuario));
        toast.success('Usuário excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir usuário.');
      }
    } else {
      toast.info('Ação de exclusão cancelada.');
    }
  };

  const handleEditWallet = async (id_usuario, newWalletValue) => {
    try {
            if (!newWalletValue || isNaN(newWalletValue)) {
        toast.error('Valor inválido para a carteira.');
        return;
      }
  
            const payload = {
        id_usuario,
        carteira: parseFloat(newWalletValue)       };
  
            const response = await api.put(`/api/usuarios/${id_usuario}`, payload);
  
      if (response.status === 200) {
        setUsers(users.map((user) =>
          user.id_usuario === id_usuario ? { ...user, carteira: newWalletValue } : user
        ));
        toast.success('Valor da carteira atualizado com sucesso!');
      } else {
        toast.error('Erro ao atualizar o valor da carteira.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o valor da carteira:', error);
      toast.error('Erro ao atualizar o valor da carteira.');
    }
  };

  const handleEditOffer = (offer) => {
    setPack({
      imagem_url: offer.imagem_url,
      quantidade: offer.quantidade,
      valor: offer.valor,
      id_oferta: offer.id_oferta
    });
};

  return (
    <>
      <HamburgerMenu />
      <div className='bodyadm'>
        {/* Adicionar Oferta */}
        <div className="navs">
          <h3>Adicionar Oferta de Moedas</h3>
          <input
            type="text"
            name="imagem_url"
            placeholder="URL da imagem"
            value={pack.imagem_url}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade de Moedas"
            value={pack.quantidade}
            onChange={handleChange}
          />
          <input
            type="number"
            name="valor"
            placeholder="Preço"
            value={pack.valor}
            onChange={handleChange}
          />
          <button onClick={handleAddOffer}>Adicionar Oferta</button>
        </div>

        {/* Lista de Ofertas Cadastradas */}
        <div className="ofertascadastradas">
          <h3>Ofertas Cadastradas</h3>
          <div className="nav3">
            {offers.length > 0 ? (
              offers.map((offer, index) => (
                <div key={index} className="offer-card">
                  <img src={offer.imagem_url} alt="Pack de Moedas" className="offer-image" />
                  <p>Moedas: {offer.quantidade}</p>
                  <p>Preço: R${offer.valor}</p>
                  <button onClick={() => handleDeleteOffer(offer.id_oferta)} className="delete-button">Deletar Oferta</button>
                  <button onClick={() => handleEditOffer(offer)} className="edit-button">Editar Oferta</button>
                </div>
              ))
            ) : (
              <p>Não há ofertas cadastradas.</p>
            )}
          </div>
        </div>

        {/* Lista de Usuários */}
        <div className="nav4">
          <h3>Lista de Usuários</h3>
          <div className="users">
            {users.length > 0 ? (
              users.map((user, index) => (
                <div key={index} className="user-card">
                  <p>ID: {user.id_usuario}</p>
                  <p>Email: {user.email}</p>
                  <p>Nome: {user.nome}</p>
                  <p>Carteira: R${user.carteira}</p>
                  <button onClick={() => handleDeleteUser(user.id_usuario)} className="delete-button">Deletar Usuário</button>
                  <button onClick={() => {
                    const newWalletValue = prompt('Digite o novo valor da carteira:');
                    if (newWalletValue) handleEditWallet(user.id_usuario, newWalletValue);
                  }} className="edit-button">Editar Carteira</button>
                </div>
              ))
            ) : (
              <p>Não há usuários registrados.</p>
            )}
          </div>
        </div>

        {/* Lista de Compras */}
        <div className="nav5">
          <h3>Lista de Compras</h3>
          <div className="purchases">
            {purchases.length > 0 ? (
              purchases.map((purchase, index) => (
                <div key={index} className="purchase-card">
                  <p>ID da Compra: {purchase.id_compra}</p>
                  <p>Usuário: {users.find(user => user.id_usuario === purchase.usuario_id)?.nome || 'Usuário não encontrado'}</p>
                  <p>Valor da Oferta: R${offers.find(offer => offer.id_oferta === purchase.oferta_id)?.valor || 'Oferta não encontrada'}</p>
                  <p>Data da Compra: {new Date(purchase.data_compra).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>Não há compras registradas.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;


