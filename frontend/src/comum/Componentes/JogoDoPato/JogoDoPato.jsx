import './Style.css';
import Quadrados from "./Quadrados";
import { useState } from 'react';
import Modal from '../Modal/Modal';
import BotaoEstiloso from '../BotaoEtiloso/BotaoEstiloso';

const JogoDoPato = () => {
    const [use, setUse] = useState(Array(9).fill(null));
    const [mensagem, setMensagem] = useState('');
    const [pontuacao, setPontuacao] = useState(0);
    const [tabuleiroAtivo, setTabuleiroAtivo] = useState(false);
    const [tentativas, setTentativas] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar o modal de compra

    const clicadoPai = (index) => {
        if (tentativas <= 0) {
            alert("Você não tem mais tentativas!");
            return;
        }

        if (use[index] !== null) {
            return;
        }

        const resultado = Math.random() < 0.5 ? "Ganhou +200$" : "Perdeu -100$";
        setMensagem(resultado);

        const novoTabuleiro = [...use];
        novoTabuleiro[index] = resultado;
        setUse(novoTabuleiro);

        if (resultado === "Ganhou +200$") {
            setPontuacao(pontuacao + 200);
        } else {
            setPontuacao(pontuacao - 100);
        }

        setTentativas(tentativas - 1);

        if (tentativas - 1 <= 0) {
            setMostrarModal(true); // Mostra o modal ao acabar as tentativas
        }
    };

    const habilitarTabuleiro = () => {
        if (mostrarModal === false) {  // Verifica se o modal não está visível
            setTentativas(3);  // Define 3 tentativas ao iniciar o jogo
            setTabuleiroAtivo(true);  // Ativa o tabuleiro
            setMensagem('');  // Limpa a mensagem ao iniciar o jogo
        } else {
            alert('Feche o modal para começar o jogo');
        }
        if (tentativas==0) {
            setMostrarModal(true)
            
        }
    };
    

    const reiniciarJogo = () => {
        setUse(Array(9).fill(null));
        setMensagem('');
        setTabuleiroAtivo(false);
        setMostrarModal(false); // Fecha o modal ao reiniciar o jogo
    };

    // Função para comprar tentativas
    const comprarTentativas = () => {
        if (pontuacao >= 500) { // O custo para comprar uma tentativa
            setPontuacao(pontuacao - 500); // Deduz 100 pontos
            setTentativas(tentativas + 3); // Adiciona 1 tentativa
            setMostrarModal(false); // Fecha o modal
        } else {
            alert("Você não tem pontos suficientes para comprar tentativas!");
        }
    };
    const fechar=()=>{
        setMostrarModal(false) 
    }

    return (
      <>  
        <div className='alinhar'>
            <div className="pontuacao">
                Dinheiro: {pontuacao} <br />
                Tentativas: {tentativas}
            </div>
            
            <div className="board-row">
                <Quadrados value={use[0]} index={0} clicadoFilho={clicadoPai} ativo={tabuleiroAtivo} />
                <Quadrados value={use[1]} index={1} clicadoFilho={clicadoPai} ativo={tabuleiroAtivo} />
                <Quadrados value={use[2]} index={2} clicadoFilho={clicadoPai} ativo={tabuleiroAtivo} />
            </div>
            <div className="board-row">
                <Quadrados value={use[3]} index={3} clicadoFilho={clicadoPai} ativo={tabuleiroAtivo} />
                <Quadrados value={use[4]} index={4} clicadoFilho={clicadoPai} ativo={tabuleiroAtivo} />
                <Quadrados value={use[5]} index={5} clicadoFilho={clicadoPai} ativo={tabuleiroAtivo} />
            </div>
            <div className="board-row">
                <Quadrados value={use[6]} index={6} clicadoFilho={clicadoPai} ativo={tabuleiroAtivo} />
                <Quadrados value={use[7]} index={7} clicadoFilho={clicadoPai} ativo={tabuleiroAtivo} />
                <Quadrados value={use[8]} index={8} clicadoFilho={clicadoPai} ativo={tabuleiroAtivo} />
            </div>
        
            {/*{mensagem && <div className="resultado">{mensagem}</div>}*/}
            
                <button className={`jogar ${tabuleiroAtivo ? 'ativo' : ''}`} onClick={habilitarTabuleiro}>
                Jogar<span></span>
            </button>
            <button className="reiniciar" onClick={reiniciarJogo}>
                Reiniciar
            </button>
            
            
            
            <Modal 
                mostrar={mostrarModal} 
                comprarTentativas={comprarTentativas} 
                pontuacao={pontuacao} 
                reiniciarJogo={reiniciarJogo} 
                fechar={fechar}
            />
        </div>
      </>
    );
};

export default JogoDoPato;
