import React from "react";
import "./PaginaInicio.css";
import { Link } from "react-router-dom";

const PaginaInicio = () => {
  return (
    <>
      <nav className="nav">
        <Link to="/sobre">Sobre</Link> |
        <Link to="/perfil">Perfil</Link> |
        <Link to="/jogar">Jogar</Link> |
        <Link to="/sair">Sair</Link> |
        <Link to="/admin">Admin</Link> |
        <Link to="/home">Home</Link> |
        <Link to="/roleta">Roleta</Link>
      </nav>

      <div className="body">
  

  <div className="instructions-container">
<p className="page-header">
    <h2>Bem-vindo ao Início!</h2>
    Aqui você começa sua jornada no nosso site. Explore as opções e divirta-se.
  </p>

    <div className="instructions">
      <h3>Instruções do Jogo de Roleta</h3>
      <ul>
        <li>
          <strong>Escolha de Números:</strong> Escolha até <strong>10 números diferentes</strong> ou 
          <strong> repita o mesmo número até 10 vezes</strong>. Cada número custa <strong>10 créditos</strong>.
        </li>
        <li>
          <strong>Regras de Aposta:</strong> Repetir o mesmo número aumenta suas chances e 
          <strong> multiplica o prêmio proporcionalmente às apostas no mesmo número</strong>. 
          O custo total será o número de apostas vezes 10 créditos.
        </li>
        <li>
          <strong>Prêmios:</strong> Se o número sorteado for um dos escolhidos, você receberá o 
          <strong> dobro do valor apostado para cada vez que escolheu aquele número</strong>. Caso 
          não acerte, o valor apostado será descontado do saldo.
        </li>
        <li>
          <strong>Importante:</strong> O saldo da sua carteira será atualizado automaticamente 
          após cada rodada. Divirta-se e jogue de forma responsável!
        </li>
      </ul>
    </div>

    <div className="instructions">
      <h3>Instruções do Jogo de Quadrados</h3>
      <ul>
        <li>
          <strong>Objetivo:</strong> Clique nos quadrados para ganhar ou perder créditos. Cada quadrado pode conter uma recompensa ou uma penalidade.
        </li>
        <li>
          <strong>Tentativas Iniciais:</strong> Você começa o jogo com <strong>3 tentativas</strong>.
        </li>
        <li>
          <strong>Comprar Tentativas:</strong> Caso suas tentativas acabem, você pode comprar mais utilizando créditos para continuar jogando.
        </li>
        <li>
          <strong>Finalizando o Jogo:</strong> Continue jogando até clicar nos 9 quadrados ou escolha reiniciar o jogo para embaralhar as possíveis premiações.
        </li>
        <li>
          <strong>Importante:</strong> Planeje suas jogadas e administre suas tentativas para maximizar os ganhos!
        </li>
      </ul>
    </div>
  </div>
</div>

    </>
  );
};

export default PaginaInicio;
