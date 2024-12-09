import './Style.css';
import { toast } from "react-toastify";
import Quadrados from "./Quadrados";
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { useNavigate } from "react-router-dom";
import React from 'react';
import api from '../../servicos/api';
import BotaoEtiloso from'../BotaoEtiloso/BotaoEstiloso.jsx'
const JogoDoPato = () => {
    const [use, setUse] = useState(Array(9).fill(null));
    const [mensagem, setMensagem] = useState('');
    const [pontuacao, setPontuacao] = useState(0);
    const [tabuleiroAtivo, setTabuleiroAtivo] = useState(false);
    const [tentativas, setTentativas] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!tabuleiroAtivo) {
            const interval = setInterval(() => {
                toast.info("Clique em 'Jogar' para ativar o tabuleiro!");
            }, 5000);
    
                        return () => clearInterval(interval);
        }
    }, [tabuleiroAtivo]);
    
    




        const ofertas = () => {
        navigate('/ofertas');     };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Nenhum usuário está logado.");
            navigate('/login');
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };

                const buscarSaldoInicial = async () => {
            try {
                const response = await api.get(`/api/usuarios/saldo`, { headers });
                const saldo = response.data?.saldo;

                if (typeof saldo !== 'undefined') {
                    setPontuacao(saldo);
                } else {
                    throw new Error("Saldo não encontrado.");
                }
            } catch (error) {
                toast.error("Erro ao buscar o saldo inicial do usuário.");
                console.error("Erro ao buscar saldo:", error);
            }
        };

        buscarSaldoInicial();
    }, [navigate]);

    const clicadoPai = async (index) => {
        
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        

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

        try {
            let novoSaldo = pontuacao;

            if (resultado === "Ganhou +200$") {
                novoSaldo += 200;
                toast.success("Parabéns! Você ganhou +200 moedas.");
            } else {
                novoSaldo -= 100;
                toast.error("Ah não! Você perdeu 100 moedas.");
            }

                        setPontuacao(novoSaldo);
            await api.put('/api/usuarios/saldo', { saldo: novoSaldo }, { headers });

        } catch (error) {
            toast.error("Erro ao atualizar o saldo do usuário.");
            console.error("Erro ao atualizar saldo:", error);
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

    const comprarTentativas = async () => {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        if (pontuacao >= 500) {
            try {
                const novoSaldo = pontuacao - 500;
                await api.put('/api/usuarios/saldo', { saldo: novoSaldo }, { headers });
                setPontuacao(novoSaldo);
                setTentativas(tentativas + 3);
                setMostrarModal(false);
                toast.success("Você comprou mais 3 tentativas!");
            } catch (error) {
                toast.error("Erro ao atualizar saldo após comprar tentativas.");
                console.error("Erro ao atualizar saldo:", error);
            }
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
