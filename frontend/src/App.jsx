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




import ImagePreloader from './components/ImagePreloader';

const App = () => {
  
  const [isLoaded, setIsLoaded] = useState(false);

 

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
      <Route path="/inicio" element={<PaginaInicio />} />
      <Route path="/sobre" element={<PaginaSobre />} />
      <Route path="/perfil" element={<PaginaPerfil />} />
      <Route path="/jogar" element={<PaginaJogar />} />
      <Route path="/roleta" element={<PaginaRoleta />} />
      <Route path="/sair" element={<PaginaSair />} />
      <Route path="/ofertas" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
    <Rodape />
  </div>
</Router>

    </>
  );
};

export default App;
