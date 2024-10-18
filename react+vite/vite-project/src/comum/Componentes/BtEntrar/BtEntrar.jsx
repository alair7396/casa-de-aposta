
import './BtEntrar.css'; // Importa o arquivo de estilos

// Definindo os botões como componentes funcionais
const BtEntrar = ({ onClick, texto }) => {
  return (
    <button onClick={onClick} className="btentrar">
      {texto}Logar
    </button>
  );
};






export default BtEntrar;
