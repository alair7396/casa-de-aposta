import { Link } from 'react-router-dom'
const PaginaSobre=()=>{
    return(
        <>
        <nav className='nav'>
            <Link to="/body2">Criar Conta</Link> | 
            <Link to="/">Entrar</Link> | 
            <Link to='/inicio'>Inicio</Link> | 
            <Link to='/perfil'>Perfil</Link> | 
            <Link to='/jogar'>Jogar</Link> | 
            <Link to='/sair'>Sair</Link>  | 
            <Link to='/roleta'>Roleta</Link> |  
             
        </nav>
        
        <div className='body'> 
        <h1>Conteúdo do Body 4</h1>  
        </div>
        
        </>
        
    )
}
export default PaginaSobre;