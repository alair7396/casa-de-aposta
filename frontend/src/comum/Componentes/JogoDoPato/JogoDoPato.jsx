import './Style.css';
import { toast } from "react-toastify";
import Quadrados from "./Quadrados";
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import BotaoEstiloso from '../BotaoEtiloso/BotaoEstiloso.jsx';
import ServicoUsuarios from "../../servicos/ServicoUsuarios.js";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao.js";
import { useNavigate } from "react-router-dom";
import React from 'react';

const servicoUsuarios = new ServicoUsuarios();

const JogoDoPato = () => {
    const [use, setUse] = useState(Array(9).fill(null));
    const [mensagem, setMensagem] = useState('');
    const [pontuacao, setPontuacao] = useState(0);
    const [tabuleiroAtivo, setTabuleiroAtivo] = useState(false);
    const [tentativas, setTentativas] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);

    const navigate = useNavigate(); // Inicialização correta de navigate

    const ofertas = () => {
        navigate('/ofertas'); // Uso correto do navigate
    };

    const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado();
    const emailUsuarioLogado = usuarioLogado ? usuarioLogado.email : null;

    if (!emailUsuarioLogado) {
        toast.error("Nenhum usuário está logado.");
    }

    useEffect(() => {
        const buscarSaldoInicial = async () => {
            try {
                const saldo = await servicoUsuarios.obterSaldoUsuario(emailUsuarioLogado);
                setPontuacao(saldo);
            } catch (error) {
                toast.error("Erro ao buscar o saldo inicial do usuário.");
                console.error("Erro ao buscar saldo:", error);
            }
        };

        buscarSaldoInicial();
    }, [emailUsuarioLogado]);

    const clicadoPai = (index) => {
        if (mostrarModal) {
            toast.info("Feche o modal antes de jogar!");
            return;
        }

        if (tentativas <= 0) {
            toast.error("Você não tem mais tentativas!");
            setMostrarModal(true);
            return;
        }

        if (use[index] !== null) {
            toast.info("Este quadrado já foi escolhido.");
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
            servicoUsuarios.atualizarSaldoUsuario(emailUsuarioLogado, novoSaldo);
            toast.success("Parabéns! Você ganhou +200 moedas.");
        } else {
            const novoSaldo = pontuacao - 100;
            setPontuacao(novoSaldo);
            servicoUsuarios.atualizarSaldoUsuario(emailUsuarioLogado, novoSaldo);
            toast.error("Ah não! Você perdeu 100 moedas.");
        }

        setTentativas(tentativas - 1);

        if (tentativas - 1 <= 0) {
            setMostrarModal(true);
        }
    };

    const habilitarTabuleiro = () => {
        if (mostrarModal) {
            toast.info("Feche o modal para começar um novo jogo.");
            return;
        }

        if (tentativas === 0) {
            setMostrarModal(true);
            toast.info("Você não tem tentativas. Compre mais para continuar jogando!");
            return;
        }

        setTabuleiroAtivo(true);
        setMensagem('');
        toast.success("Jogo iniciado! Boa sorte.");
    };

    const reiniciarJogo = () => {
        if (mostrarModal) {
            toast.info("Feche o modal antes de reiniciar o jogo!");
            return;
        }

        setUse(Array(9).fill(null));
        setMensagem('');
        setTabuleiroAtivo(false);
        toast.success("O jogo foi reiniciado.");
    };

    const comprarTentativas = () => {
        if (pontuacao >= 500) {
            const novoSaldo = pontuacao - 500;
            setPontuacao(novoSaldo);
            servicoUsuarios.atualizarSaldoUsuario(emailUsuarioLogado, novoSaldo);
            setTentativas(tentativas + 3);
            setMostrarModal(false);
            toast.success("Você comprou mais 3 tentativas!");
        } else {
            toast.error("Você não tem pontos suficientes para comprar tentativas!");
        }
    };

    const fechar = () => {
        setMostrarModal(false);
        toast.info("Modal fechado.");
    };

    return (
        <>
            <div className="game-status-container">
                <div className="game-status">
                    <strong className="game-label">Moedas:</strong> {pontuacao} <br />
                    <strong className="game-label">Tentativas:</strong> {tentativas}
                </div>
                <div className="game-board-container">
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
                    <button className={`game-button ${tabuleiroAtivo ? 'active' : ''}`} onClick={habilitarTabuleiro}>
                        Jogar
                    </button>
                    <button className="game-button restart" onClick={reiniciarJogo}>
                        Reiniciar
                    </button>
                </div>
                <Modal 
                    mostrar={mostrarModal} 
                    comprarTentativas={comprarTentativas} 
                    pontuacao={pontuacao} 
                    ofertas={ofertas} 
                    fechar={fechar}
                />
            </div>
        </>
    );
};

export default JogoDoPato;
