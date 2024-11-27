import { useState, useEffect } from 'react';
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
import AdminPage from './comum/Pages/AdminPage/AdminPage';  // Importação da página Admin
import HomePage from './comum/Pages/HomePage/HomePage';    // Importação da página HomePage
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './comum/Componentes/Login/Login';

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // Gerenciar o evento 'beforeinstallprompt'
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true); // Mostra o botão de instalação
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Ação do botão de instalação
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou instalar o PWA');
        } else {
          console.log('Usuário recusou instalar o PWA');
        }
        setDeferredPrompt(null);
        setShowInstallButton(false); // Esconde o botão após a interação
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <div className="container">
          <Cabecalho />
          {/* Botão de instalação */}
          {showInstallButton && (
            <button 
              onClick={handleInstallClick} 
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#FFF',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: 1000,
              }}
            >
              Instalar App
            </button>
          )}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/inicio" element={<PaginaInicio />} />
            <Route path="/sobre" element={<PaginaSobre />} />
            <Route path="/perfil" element={<PaginaPerfil />} />
            <Route path="/jogar" element={<PaginaJogar />} />
            <Route path="/roleta" element={<PaginaRoleta />} />
            <Route path="/sair" element={<PaginaSair />} />
            <Route path="/admin" element={<AdminPage />} />    {/* Nova rota AdminPage */}
            <Route path="/home" element={<HomePage />} />      {/* Nova rota HomePage */}
          </Routes>
          <Rodape />
        </div>
      </Router>
    </>
  );
};

export default App;
