import { Link } from "react-router-dom";

const PaginaSair=()=>{
    return(
        <>
        <nav className='nav'> 
        <Link to='/sobre'>Sobre</Link> |  
        <Link to='/inicio'>Início</Link> |  
        <Link to='/perfil'>Perfil</Link> |  
        <Link to='/jogar'>Jogar</Link> |  
        <Link to='/sair'>Sair</Link> |  
        <Link to='/admin'>Admin</Link> |  
        <Link to='/home'>Home</Link>
      </nav>
      <div className='body'> 
            <h1>Conteúdo do PaginaSair</h1>  
        </div>
        </>
        
    )
}
export default PaginaSair;