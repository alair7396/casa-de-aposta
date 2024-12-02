
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Rodape from './comum/Componentes/Rodape/Rodape';
import Cabecalho from './comum/Componentes/Cabecalho/Cabecalho';

import Cadastro from './comum/Pages/Cadastro/Cadastro';
import PaginaInicio from './comum/Pages/PaginaInicio/PaginaInicio';
import PaginaSobre from './comum/Pages/PaginaSobre/PaginaSobre';
import PaginaPerfil from './comum/Pages/PaginaPerfil/PaginaPerfil';
import PaginaJogar from './comum/Pages/PaginaJogar/PaginaJogar';
import PaginaSair from './comum/Pages/PaginaSair/PaginaSair';
import PaginaRoleta from './comum/Pages/PaginaRoleta/PaginaRoleta';
import AdminPage from './comum/Pages/AdminPage/AdminPage';
import HomePage from './comum/Pages/PaginaOfertas/HomePage.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './comum/Componentes/Login/Login';

import RotaPrivada from './comum/servicos/RotaPrivada.jsx'; // Rotas protegidas para usuários autenticados
import RotaAdmin from './comum/servicos/RotaAdmin.jsx'; // Rotas protegidas para administradores

import ImagePreloader from './components/ImagePreloader'; // Importação do componente

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Controle de carregamento

  if (!isLoaded) {
    return <ImagePreloader onComplete={() => setIsLoaded(true)} />;
  }

  return (
    <>
      <ToastContainer 
    position="top-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    draggable
    pauseOnHover
/>

      <Router>
        <div className="container">
          <Cabecalho />
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            {/* Rotas privadas (somente para usuários logados) */}
            <Route path="/inicio" element={<RotaPrivada element={PaginaInicio} />} />
            <Route path="/sobre" element={<RotaPrivada element={PaginaSobre} />} />
            <Route path="/perfil" element={<RotaPrivada element={PaginaPerfil} />} />
            <Route path="/jogar" element={<RotaPrivada element={PaginaJogar} />} />
            <Route path="/roleta" element={<RotaPrivada element={PaginaRoleta} />} />
            <Route path="/sair" element={<RotaPrivada element={PaginaSair} />} />
            <Route path="/ofertas" element={<RotaPrivada element={HomePage} />} />

            {/* Rotas exclusivas para administradores */}
            <Route path="/admin" element={<RotaAdmin element={AdminPage} />} />
          </Routes>
          <Rodape />
        </div>
      </Router>
    </>
  );
};

export default App;
