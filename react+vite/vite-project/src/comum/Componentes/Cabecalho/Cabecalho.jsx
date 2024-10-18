import { Link } from 'react-router-dom'

import './Cabecalho.css'
const Cabecalho = () => {
    return (
        <header style={{ backgroundColor: '#f8f9fa', padding: '10px', textAlign: 'center' }}>
            <h1>Meu Cabeçalho</h1>
            <nav>
                <Link to="/">Entrar</Link> | 
                <Link to="/body2">Criar Conta</Link> | 
                <Link to='/inicio'>Inicio</Link> | 
                <Link to='/sobre'>Sobre</Link> | 
                <Link to='/perfil'>Perfil</Link> | 
                <Link to='/jogar'>Jogar</Link> | 
                <Link to='/sair'>Sair</Link> | 
                  
                
            </nav>
        </header>
    );
};

export default Cabecalho;
