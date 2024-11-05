import './Style.css';
import Quadrados from "./Quadrados";
import { useState } from 'react';

const JogoDoPato=()=>{
    const [use,setUse]=useState(Array(9).fill(null));
    const [mensagem,setMensagem]=useState('');
    const [pontuacao, setPontuacao] = useState(null);
    
  
    const clicadoPai = (index) => {
        if (use[index] !== null) {
            return;  
        }
        const resultado = Math.random() < 0.5 ? "Venceu" : "Perdeu";
        setMensagem(resultado);
        const novoTabuleiro = [...use];
        novoTabuleiro[index] = resultado; 
        setUse(novoTabuleiro);
    }
    const calcularPontuacao = () => {
        let total = 0;
        use.forEach((valor) => {
            if (valor === "Venceu") {
                total += 200;  
            } else if (valor === "Perdeu") {
                total -= 100;  
            }
        });
        setPontuacao(total);  
    }

    const reiniciarJogo = () => {
        setUse(Array(9).fill(null));  
        setMensagem('');  
        setPontuacao(null);  
    }
    


    return(
      <>  
      <div className='alinhar'>
      {pontuacao !== null && (
                <div className="pontuacao">
                    Pontuação final: {pontuacao}
                </div>
    )}
     <div className="board-row">
        <Quadrados value={use[0]} index={0} clicadoFilho={clicadoPai} />
        <Quadrados value={use[1]} index={1} clicadoFilho={clicadoPai} />
        <Quadrados value={use[2]} index={2} clicadoFilho={clicadoPai} />
    </div>
    <div className="board-row">
        <Quadrados value={use[3]} index={3} clicadoFilho={clicadoPai} />
        <Quadrados value={use[4]} index={4} clicadoFilho={clicadoPai} />
        <Quadrados value={use[5]} index={5} clicadoFilho={clicadoPai} />
    </div>
    <div className="board-row">
        <Quadrados value={use[6]} index={6} clicadoFilho={clicadoPai} />
        <Quadrados value={use[7]} index={7} clicadoFilho={clicadoPai} />
        <Quadrados value={use[8]} index={8} clicadoFilho={clicadoPai} />
    </div>
    {mensagem && <div className="resultado">{mensagem}</div>}
        
    <button className="jogar" onClick={calcularPontuacao}>
                Jogar
    </button>
    
    <button className="reiniciar" onClick={reiniciarJogo}>
                Reiniciar
    </button>
    </div>
    
        </>
    )
}
export default JogoDoPato;


