const Quadrados = ({ value, index, clicadoFilho }) => {
    return (
        <>
            <button className="square" onClick={() => clicadoFilho(index)}>
                {value}
            </button>
        </>
    );
}

export default Quadrados;
