import React from 'react';
import './Modal.css';

const Modal = ({ mostrar, comprarTentativas, pontuacao, ofertas,fechar }) => {
    if (!mostrar) {
        return null; // Não renderiza nada se não for para mostrar
    }

    return (
        <div className="modal">
            <div className="modal-conteudo">
                <h2>Fim de Jogo</h2>
                <p>Seu Dinheiro atual é de: {pontuacao}$</p>
                <p>Você deseja comprar mais tentativas?</p>
                <p>São três tentativas por 500$.</p>
                <button onClick={comprarTentativas}>Comprar as tentativa</button>
                <button onClick={ofertas}>Para a página de ofertas</button>
                <button onClick={fechar}>Fechar</button>
            </div>
        </div>
    );
};

export default Modal;
