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

import RotaPrivada from './comum/servicos/RotaPrivada.jsx';
import RotaAdmin from './comum/servicos/RotaAdmin.jsx';

import ImagePreloader from './components/ImagePreloader';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Configuração automática do administrador no localStorage
  React.useEffect(() => {
    const listaUsuarios = JSON.parse(localStorage.getItem('lista-usuarios')) || [];

    // Verifica se o administrador já está configurado
    const adminExistente = listaUsuarios.find((user) => user.email === 'admin@');

    if (!adminExistente) {
      const adminUser = {
        email: 'admin@',
        senha: 'admin123',
        nome: 'Administrador',
        role: 'admin',
        carteira: 1000,
      };

      // Adiciona o administrador à lista de usuários e salva no localStorage
      listaUsuarios.push(adminUser);
      localStorage.setItem('lista-usuarios', JSON.stringify(listaUsuarios));
      console.log('Administrador adicionado automaticamente!');
    }
  }, []); // Executa apenas uma vez no carregamento

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
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/inicio" element={<RotaPrivada element={PaginaInicio} />} />
            <Route path="/sobre" element={<RotaPrivada element={PaginaSobre} />} />
            <Route path="/perfil" element={<RotaPrivada element={PaginaPerfil} />} />
            <Route path="/jogar" element={<RotaPrivada element={PaginaJogar} />} />
            <Route path="/roleta" element={<RotaPrivada element={PaginaRoleta} />} />
            <Route path="/sair" element={<RotaPrivada element={PaginaSair} />} />
            <Route path="/ofertas" element={<RotaPrivada element={HomePage} />} />
            <Route path="/admin" element={<RotaAdmin element={AdminPage} />} />
          </Routes>
          <Rodape />
        </div>
      </Router>
    </>
  );
};

export default App;
