import ImputLog from '../ImputLog/ImputLog';
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
        <nav className='nav'>
                <Link to="/cadastro">Criar Conta</Link> |
                 
        </nav>
        
        <main className='body'>
            <ImputLog/>
        </main>
        </>
        
    );
};

export default Login;
