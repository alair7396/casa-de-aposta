import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link para navegação
import ServicoUsuarios from '../../servicos/ServicoUsuarios';
import './AdminPage.css';

const instanciaServicoUsuarios = new ServicoUsuarios();

function AdminPage() {
  const [pack, setPack] = useState({ image: '', coins: '', price: '' });
  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Carrega as ofertas e os usuários do localStorage e do serviço de usuários
    const savedOffers = JSON.parse(localStorage.getItem('offers') || '[]');
    setOffers(savedOffers);

    const savedUsers = instanciaServicoUsuarios.buscarUsuarios(); // Função que retorna todos os usuários
    setUsers(savedUsers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPack((prevPack) => ({ ...prevPack, [name]: value }));
  };

  const handleAddOffer = () => {
    const newOffer = { ...pack };
    const offers = JSON.parse(localStorage.getItem('offers') || '[]');
    offers.push(newOffer);
    localStorage.setItem('offers', JSON.stringify(offers));
    alert('Oferta adicionada com sucesso!');
    setPack({ image: '', coins: '', price: '' });
    setOffers(offers); // Atualiza a lista de ofertas exibidas
  };

  const handleDeleteOffer = (index) => {
    const updatedOffers = [...offers];
    updatedOffers.splice(index, 1);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
    setOffers(updatedOffers); // Atualiza a lista de ofertas exibidas
    alert('Oferta excluída com sucesso!');
  };

  const handleDeleteUser = (email) => {
    instanciaServicoUsuarios.deletarUsuario(email); // Deleta o usuário através do serviço
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers); // Atualiza a lista de usuários
    alert('Usuário excluído com sucesso!');
  };

  return (
    <>
    <nav className='nav'>
        |<Link to='/sair'>Sair</Link> |
        |<Link to='/ofertas'>Ofertas</Link>|
        
      </nav>
    <div className='bodyadm'>
      {/* Barra de navegação */}
      

      {/* Conteúdo da página Admin */}
      <div className="nav">
        <h3>Adicionar Oferta de Moedas</h3>
        <input
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={pack.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="coins"
          placeholder="Quantidade de Moedas"
          value={pack.coins}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={pack.price}
          onChange={handleChange}
        />
        <button onClick={handleAddOffer}>Adicionar Oferta</button>
      </div>

      {/* Lista de Ofertas Cadastradas */}
      <div className="nav">
        <h3>Ofertas Cadastradas</h3>
        <div className="nav">
          {offers.length > 0 ? (
            offers.map((offer, index) => (
              <div key={index} className="offer-card">
                <img src={offer.image} alt="Pack de Moedas" className="offer-image" />
                <p>Moedas: {offer.coins}</p>
                <p>Preço: R${offer.price}</p>
                <button onClick={() => handleDeleteOffer(index)} className="delete-button">Deletar Oferta</button>
              </div>
            ))
          ) : (
            <p>Não há ofertas cadastradas.</p>
          )}
        </div>
      </div>

      {/* Lista de Usuários */}
      <div className="nav">
        <h3>Lista de Usuários</h3>
        <div className="users">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index} className="user-card">
                <p>Email: {user.email}</p>
                <button onClick={() => handleDeleteUser(user.email)} className="delete-button">Deletar Usuário</button>
              </div>
            ))
          ) : (
            <p>Não há usuários registrados.</p>
          )}
        </div>
      </div>
    </div></>
  );
}

export default AdminPage;
