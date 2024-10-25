
import './BtEntrar.css'; // Importa o arquivo de estilos

// Definindo os botões como componentes funcionais
const BtEntrar = ({ onClick, texto }) => {
  return (
    <button onClick={onClick} className="btentrar" style={{top: '563px', left: '19px'}}>
      {texto}Let's Rock
    </button>
  );
};






export default BtEntrar;
