import './Cabecalho.css';


const Cabecalho = () => {
    return (
        <header className='cabecalho'>
            
            <h1>DuckTax</h1>
            <nav>
                <ul className="menu">
                    <li><a href="/">Início</a></li>
                    <li><a href="/sobre">Sobre</a></li>
                    <li><a href="/serviços">Serviços</a></li>
                    <li><a href="/contato">Contato</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Cabecalho;
