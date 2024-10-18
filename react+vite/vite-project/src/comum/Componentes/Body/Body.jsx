import ImputLog from '../ImputLog/ImputLog';
import './Body.css'


const Body = () => {
    return (
        <main style={{ padding: '20px' }}>
            <h2>Conteúdo Principal</h2>
            <p>Aqui está o conteúdo do seu aplicativo.</p>
            <ImputLog/>
        </main>
    );
};

export default Body;
