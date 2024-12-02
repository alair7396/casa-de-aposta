import JogoDoPato from "../../Componentes/JogoDoPato/JogoDoPato";
import HamburgerMenu from "../../Componentes/Menu/HamburgerMenu";

const PaginaJogar=()=>{
    return(
        <>
        <HamburgerMenu/>
            <div className='body'> 
            <JogoDoPato/> 
            </div>
        </>
        
    )
}
export default PaginaJogar;