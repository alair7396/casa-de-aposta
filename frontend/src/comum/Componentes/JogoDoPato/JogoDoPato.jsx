import './Style.css';
import { toast } from "react-toastify";
import Quadrados from "./Quadrados";
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { useEffect } from 'react';
import VerSaldoConsole from './VerSaldoConsole.jsx';
import ServicoUsuarios from "../../servicos/ServicoUsuarios.js";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao.js";
const servicoUsuarios = new ServicoUsuarios();
const servicoAutenticacao = new ServicoAutenticacao();
const JogoDoPato = () => {
    const [use, setUse] = useState(Array(9).fill(null));
    const [mensagem, setMensagem] = useState('');
    const [pontuacao, setPontuacao] = useState(0); // Sincronizado com a carteira
    const [tabuleiroAtivo, setTabuleiroAtivo] = useState(false);
    const [tentativas, setTentativas] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);

     
    const usuarioLogado = servicoAutenticacao.buscarUsuarioLogado();
const emailUsuarioLogado = usuarioLogado ? usuarioLogado.email : null;

if (!emailUsuarioLogado) {
    console.error("Nenhum usuário está logado.");
    // Opcional: redirecionar ou exibir uma mensagem
}
    useEffect(() => {
        const buscarSaldoInicial = async () => {
            const saldo = await servicoUsuarios.obterSaldoUsuario(emailUsuarioLogado);
            setPontuacao(saldo); // Inicializa a pontuação com o saldo da carteira
        };

        buscarSaldoInicial();
    }, []);

    const clicadoPai = (index) => {
        if (tentativas <= 0) {
           toast("Você não tem mais tentativas!");
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
            const novoSaldo = pontuacao + 200;
            setPontuacao(novoSaldo);
            servicoUsuarios.atualizarSaldoUsuario(emailUsuarioLogado, novoSaldo); // Atualiza o saldo no serviço
        } else {
            const novoSaldo = pontuacao - 100;
            setPontuacao(novoSaldo);
            servicoUsuarios.atualizarSaldoUsuario(emailUsuarioLogado, novoSaldo); // Atualiza o saldo no serviço
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
           toast('Feche o modal para começar o jogo');
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
        if (pontuacao >= 500) {
            const novoSaldo = pontuacao - 500;
            setPontuacao(novoSaldo);
            servicoUsuarios.atualizarSaldoUsuario(emailUsuarioLogado, novoSaldo); // Atualiza o saldo no serviço
            setTentativas(tentativas + 3);
            setMostrarModal(false);
        } else {
           toast("Você não tem pontos suficientes para comprar tentativas!");
        }
    };
    const fechar=()=>{
        setMostrarModal(false) 
    }

    return (
      <>  
        <div className='alinhar'>
            <div className='nav'>
                <strong className='color2'>Moedas:</strong> {pontuacao} <br />
                Tentativas: {tentativas}
            </div>
            <div className="fundoImput">
                
            
            
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
            </div>
            
            
            <Modal 
                mostrar={mostrarModal} 
                comprarTentativas={comprarTentativas} 
                pontuacao={pontuacao} 
                reiniciarJogo={reiniciarJogo} 
                fechar={fechar}
            />
            <VerSaldoConsole/>
        </div>
      </>
    );
};

export default JogoDoPato;
