import { Link } from "react-router-dom";
import JogoDoPato from "../../Componentes/JogoDoPato/JogoDoPato";

const PaginaJogar=()=>{
    return(
        <>
            <nav className='nav'> 
                <Link to='/sobre'>Sobre</Link> |  
            </nav>
            <div className='body'> 
            <JogoDoPato/> 
            </div>
        </>
        
    )
}
export default PaginaJogar;