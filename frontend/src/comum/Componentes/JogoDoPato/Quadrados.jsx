const Quadrados = ({ value, index, clicadoFilho, ativo }) => {
    return (
        <div className="animated-button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <button  
                className={`square ${ativo ? 'ativo' : ''} ${value === "Ganhou +200$" ? 'ganhou' : ''} ${value === "Perdeu -100$" ? 'perdeu' : ''}`} 
                onClick={() => clicadoFilho(index)} 
                disabled={!ativo}
            >
                {value}
            </button> 
        </div>
    );
}

export default Quadrados;
