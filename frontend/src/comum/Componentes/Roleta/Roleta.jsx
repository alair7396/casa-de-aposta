import React, { useState, useEffect } from "react";
import "./Roleta.css";
import ServicoUsuarios from "../../servicos/ServicoUsuarios";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importação das imagens
import img0 from "../../../assets/images/0.png";
import img1 from "../../../assets/images/1.png";
import img2 from "../../../assets/images/2.png";
import img3 from "../../../assets/images/3.png";
import img4 from "../../../assets/images/4.png";
import img5 from "../../../assets/images/5.png";
import img6 from "../../../assets/images/6.png";
import img7 from "../../../assets/images/7.png";
import img8 from "../../../assets/images/8.png";
import img9 from "../../../assets/images/9.png";
import img10 from "../../../assets/images/10.png";
import img11 from "../../../assets/images/11.png";
import img12 from "../../../assets/images/12.png";
import img13 from "../../../assets/images/13.png";
import img14 from "../../../assets/images/14.png";
import img15 from "../../../assets/images/15.png";
import img16 from "../../../assets/images/16.png";
import img17 from "../../../assets/images/17.png";
import img18 from "../../../assets/images/18.png";
import img19 from "../../../assets/images/19.png";
import img20 from "../../../assets/images/20.png";
import img21 from "../../../assets/images/21.png";
import img22 from "../../../assets/images/22.png";
import img23 from "../../../assets/images/23.png";
import img24 from "../../../assets/images/24.png";
import img25 from "../../../assets/images/25.png";
import img26 from "../../../assets/images/26.png";
import img27 from "../../../assets/images/27.png";
import img28 from "../../../assets/images/28.png";
import img29 from "../../../assets/images/29.png";
import img30 from "../../../assets/images/30.png";
import img31 from "../../../assets/images/31.png";
import img32 from "../../../assets/images/32.png";
import img33 from "../../../assets/images/33.png";
import img34 from "../../../assets/images/34.png";
import img35 from "../../../assets/images/35.png";
const imageArray = [
  img0, img32, img15, img19, img4, img21, img2, img25, img17, img34,
  img6, img27, img13, img11, img30, img8, img23, img10, img5,
  img24, img16, img33, img1, img20, img14, img31, img9, img22, img18,
  img29, img7, img28, img12, img35, img3, img26
];


const segmentOrder = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34,
  6, 27, 13, 11, 30, 8, 23, 10, 5,
  24, 16, 33, 1, 20, 14, 31, 9, 22, 18,
  29, 7, 28, 12, 35, 3, 26
];

const servicoUsuarios = new ServicoUsuarios();
const servicoAutenticacao = new ServicoAutenticacao();

const Roleta = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(0);
  const [betNumbers, setBetNumbers] = useState({});
  const [currentSegment, setCurrentSegment] = useState(segmentOrder[0]);

  const NUM_SEGMENTS = 35;
  const MAX_BETS = 30;
  const totalSpins = Math.floor(NUM_SEGMENTS * 4);

  const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33FFF3", "#FFF333", "#07f54e"]; // Lista de cores

  const usuarioLogado = servicoAutenticacao.buscarUsuarioLogado();
  const emailUsuarioLogado = usuarioLogado ? usuarioLogado.email : null;

  // Função para atualizar bordas dinâmicas
  const updateBorderColors = (classNames, colors, step) => {
    classNames.forEach((className, index) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => {
        const colorIndex = (step + index) % colors.length;
        element.style.borderColor = colors[colorIndex];
      });
    });
  };

  useEffect(() => {
    if (!emailUsuarioLogado) {
      toast.error("Nenhum usuário logado!");
      return;
    }
    const fetchSaldoInicial = async () => {
      try {
        const saldo = await servicoUsuarios.obterSaldoUsuario(emailUsuarioLogado);
        setBalance(saldo);
      } catch (error) {
        toast.error("Erro ao buscar saldo do usuário.");
      }
    };

    fetchSaldoInicial();
  }, [emailUsuarioLogado]);

  useEffect(() => {
    let interval;
    if (isSpinning) {
      const maxSpeed = 30; // Velocidade máxima (mais rápido)
      const minSpeed = 100; // Velocidade mínima (mais lento)
      let spins = 0;
      let currentSpeed = minSpeed;

      const adjustSpeed = () => {
        if (spins < totalSpins / 3) {
          currentSpeed = Math.max(maxSpeed, currentSpeed - 5); // Aceleração
        } else if (spins > (2 * totalSpins) / 3) {
          currentSpeed = Math.min(minSpeed, currentSpeed + 20); // Desaceleração
        }
      };

      const spinRoulette = () => {
        setCurrentSegment((prev) => {
          const nextIndex = (segmentOrder.indexOf(prev) + 1) % segmentOrder.length;
          return segmentOrder[nextIndex];
        });

        // Atualizar bordas dinâmicas de várias classes
        updateBorderColors(["fundoroleta", "botoes", "botoes button"], colors, spins);

        spins += 1;
        adjustSpeed();

        if (spins >= totalSpins) {
          clearInterval(interval);
          finalizeSpin();
        } else {
          clearInterval(interval);
          interval = setInterval(spinRoulette, currentSpeed);
        }
      };

      interval = setInterval(spinRoulette, currentSpeed);

      return () => clearInterval(interval);
    }
  }, [isSpinning]);

  const finalizeSpin = () => {
    // O segmento atual será o número final onde a roleta parou
    const finalSegment = currentSegment; 
    setSelectedSegment(finalSegment);
  
    setTimeout(() => {
      const betCount = betNumbers[finalSegment] || 0;
      let novoSaldo = balance;
  
      if (betCount > 0) {
        const prize = bet * betCount * 2;
        novoSaldo += prize;
        toast.success(`Você ganhou ${prize} no número ${finalSegment}!`);
      } else {
        novoSaldo -= bet;
        toast.error(`Você perdeu! O número sorteado foi ${finalSegment}.`);
      }
  
      setBalance(novoSaldo);
      servicoUsuarios.atualizarSaldoUsuario(emailUsuarioLogado, novoSaldo);
  
      setBet(0);
      setBetNumbers({});
      setIsSpinning(false);
    }, 1000);
  };

  const startSpinning = () => {
    if (bet <= 0 || bet > balance) {
      toast.info("Insira uma aposta válida dentro do saldo disponível.");
      return;
    }
    if (Object.keys(betNumbers).length === 0) {
      toast.info("Escolha pelo menos um número para apostar.");
      return;
    }
    setIsSpinning(true);
    setSelectedSegment(null);
  };

  const addBet = (num) => {
    if (isSpinning) return;
    if (Object.values(betNumbers).reduce((sum, count) => sum + count, 0) >= MAX_BETS) {
      toast.info(`Você pode apostar no máximo ${MAX_BETS} vezes.`);
      return;
    }
    setBet(bet + 10);
    setBetNumbers((prev) => ({
      ...prev,
      [num]: (prev[num] || 0) + 1,
    }));
  };

  const clearBets = () => {
    if (isSpinning) return;
    setBet(0);
    setBetNumbers({});
  };

  return (
    <div className="fundoroleta">
      <div className="legenda">
        <strong className="color">Saldo: </strong>${balance}<br />
        <strong className="color">Aposta Atual: </strong>${bet}<br />
        <strong className="color">Números Apostados: </strong>
        {Object.entries(betNumbers).map(([num, count]) => `${num} (${count}x)`).join(", ") || "Nenhum"}
      </div>

      <div className="roleta-euro">
        <img
          src={imageArray[segmentOrder.indexOf(selectedSegment !== null ? selectedSegment : currentSegment)]}
          alt={`Segmento ${selectedSegment !== null ? selectedSegment : currentSegment}`}
          className="roulette-image"
        />
      </div>

      <div className="botoes">
        {Array.from({ length: NUM_SEGMENTS }, (_, i) => (
          <button
            key={i}
            onClick={() => addBet(i)}
            className="bet-number-button"
            disabled={isSpinning}
          >
            {i}
          </button>
        ))}
      </div>

      <div className="button-group">
        <button onClick={startSpinning} disabled={isSpinning || bet === 0} className="spin-button">
          {isSpinning ? "Girando..." : "Girar"}
        </button>
        <button onClick={clearBets} disabled={isSpinning} className="clear-button">
          Limpar Apostas
        </button>
      </div>
    </div>
  );
};

export default Roleta;