import InputCadastro from '../../Componentes/InputCadastro/InputCadastro';
import './Cadastro.css'
import { Link } from 'react-router-dom'

const Cadastro = () => {
    return (
        <>
            <nav className='nav'>
                <Link to="/">Entrar</Link> |  
                 
            </nav>
        
        <div className='body'> 
            <InputCadastro></InputCadastro>
            
            
        </div>
        
        
        </>
    );
};

export default Cadastro;
