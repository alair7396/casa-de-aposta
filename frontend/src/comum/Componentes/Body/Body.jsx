import ImputLog from '../ImputLog/ImputLog';
import './Body.css'
import { Link } from 'react-router-dom'

const Body = () => {
    return (
        <>
        <nav className='nav'>
                <Link to="/body2">Criar Conta</Link> |
                <Link to='/sobre'>Sobre</Link> | 
        </nav>
        
        <main className='body'>
            <ImputLog/>
        </main>
        </>
        
    );
};

export default Body;
