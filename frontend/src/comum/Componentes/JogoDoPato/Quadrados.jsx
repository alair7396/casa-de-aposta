const Quadrados = ({ value, index, clicadoFilho,ativo }) => {
    return (
        <>
            <button  className={`square ${ativo ? 'ativo' : ''}`} 
            onClick={() => clicadoFilho(index)} 
            disabled={!ativo} >
                {value}
            </button>
        </>
    );
}

export default Quadrados;
