import React from 'react';
import ServicoUsuarios from "../../servicos/ServicoUsuarios.js";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao.js";
const servicoUsuarios = new ServicoUsuarios();
ServicoAutenticacao;



const VerSaldoConsole = () => {
    const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado();
    const emailUsuarioLogado = usuarioLogado ? usuarioLogado.email : null;
    
    if (!emailUsuarioLogado) {
        console.error("Nenhum usuário está logado.");
        // Opcional: redirecionar ou exibir uma mensagem
    }

    const buscarSaldoNoConsole = async () => {
        try {
            const saldoAtual = await servicoUsuarios.obterSaldoUsuario(emailUsuarioLogado);
            console.log(`Saldo atual do usuário (${emailUsuarioLogado}): $${saldoAtual}`);
        } catch (error) {
            console.error("Erro ao buscar o saldo:", error);
        }
    };

    return (
        <div>
            <button onClick={buscarSaldoNoConsole}>Ver Saldo no Console</button>
        </div>
    );
};

export default VerSaldoConsole;
