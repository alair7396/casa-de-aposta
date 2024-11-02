import { Link } from 'react-router-dom'

import './Cabecalho.css'
const Cabecalho = () => {
    return (
        
        <header className='cabeca'>
            
            <nav className='nav'>
                <Link to="/body2">Criar Conta</Link> | 
                <Link to="/">Entrar</Link> | 
                <Link to='/inicio'>Inicio</Link> | 
                <Link to='/sobre'>Sobre</Link> | 
                <Link to='/perfil'>Perfil</Link> | 
                <Link to='/jogar'>Jogar</Link> | 
                <Link to='/sair'>Sair</Link> 
                  
                
            </nav>
        </header>
        
        
    );
};

export default Cabecalho;
