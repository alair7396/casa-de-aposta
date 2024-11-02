
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import'./App.css';
import Rodape from "./comum/Componentes/Rodape/Rodape";
import Cabecalho from "./comum/Componentes/Cabecalho/Cabecalho";
import Body from "./comum/Componentes/Body/Body";
import Cadastro from './comum/Pages/Cadastro/Cadastro';
import PaginaInicio from './comum/Pages/PaginaInicio/PaginaInicio';
import PaginaSobre from './comum/Pages/PaginaSobre/PaginaSobre';
import PaginaPerfil from './comum/Pages/PaginaPerfil/PaginaPerfil';
import PaginaJogar from './comum/Pages/PaginaJogar/PaginaJogar';
import PaginaSair from './comum/Pages/PaginaSair/PaginaSair';



const App=()=>{
  
  return(
    <Router>
       
       <div className="container">
       <Cabecalho/>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/body2" element={<Cadastro />} />
          <Route path="/inicio" element={<PaginaInicio />} />
          <Route path="/sobre" element={<PaginaSobre />} />
          <Route path="/perfil" element={<PaginaPerfil />} />
          <Route path="/jogar" element={<PaginaJogar />} />
          <Route path="/sair" element={<PaginaSair />} />
        </Routes>
        <Rodape/>
    </div>
    </Router>
  )
}

export default App;