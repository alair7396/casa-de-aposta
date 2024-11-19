import { Link } from "react-router-dom";
import JogoDoPato from "../../Componentes/JogoDoPato/JogoDoPato";

const PaginaJogar=()=>{
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
            <JogoDoPato/> 
            </div>
        </>
        
    )
}
export default PaginaJogar;