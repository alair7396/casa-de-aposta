import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PaginaInicio from './pages/PaginaInicio';
import PaginaSobre from './pages/PaginaSobre';
import PaginaPerfil from './pages/PaginaPerfil';
import PaginaJogar from './pages/PaginaJogar';
import PaginaCriarConta from './pages/PaginaCriarConta';
import PaginaEntrar from './pages/PaginaEntrar';
import PaginaSair from './pages/PaginaSair';
import Cabecalho from './comum/Components/Cabecalho/Cabecalho';

function App() {
  return (
    <Router>
      <div className="App">
        <Cabecalho />
        <Routes>
          <Route path="/inicio" element={<PaginaInicio />} />
          <Route path="/sobre" element={<PaginaSobre />} />
          <Route path="/perfil" element={<PaginaPerfil />} />
          <Route path="/jogar" element={<PaginaJogar />} />
          <Route path="/criar-conta" element={<PaginaCriarConta />} />
          <Route path="/entrar" element={<PaginaEntrar />} />
          <Route path="/sair" element={<PaginaSair />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
