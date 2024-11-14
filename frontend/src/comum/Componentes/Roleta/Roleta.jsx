import React, { useState, useEffect } from "react";
import "./Roleta.css";
import ServicoUsuarios from "../../servicos/ServicoUsuarios"; // Importe o serviço de usuário
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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

// Array com todas as imagens importadas
const imageArray = [
  img0, img1, img2, img3, img4, img5, img6, img7, img8, img9,
  img10, img11, img12, img13, img14, img15, img16, img17, img18, img19,
  img20, img21, img22, img23, img24, img25, img26, img27, img28, img29,
  img30, img31, img32, img33, img34, img35
];

const servicoUsuarios = new ServicoUsuarios();
const servicoAutenticacao = new ServicoAutenticacao();

// Obtém o usuário logado
const usuarioLogado = servicoAutenticacao.buscarUsuarioLogado();
const emailUsuarioLogado = usuarioLogado ? usuarioLogado.email : null; // Verifica se o usuário está logado

const Roleta = () => {
  const [resizedImages, setResizedImages] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(0);
  const [betNumbers, setBetNumbers] = useState({});
  const [currentSegment, setCurrentSegment] = useState(0);
  const NUM_SEGMENTS = 36;
  const SPIN_TIME = 10;
  const MAX_BETS = 10;

  useEffect(() => {
    if (!emailUsuarioLogado) {
      toast.error("Nenhum usuário logado!");
      return;
    }
    // Busca o saldo inicial do usuário
    const saldoInicial = servicoUsuarios.obterSaldoUsuario(emailUsuarioLogado); // Chamada corrigida
    setBalance(saldoInicial);

    // Redimensiona as imagens
    const resizeImages = async () => {
      const promises = imageArray.map((image) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = image;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 300;
            canvas.height = 300;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, 300, 300);
            resolve(canvas.toDataURL());
          };
        });
      });
      const resizedImagesArray = await Promise.all(promises);
      setResizedImages(resizedImagesArray);
    };

    resizeImages();
  }, []);

  useEffect(() => {
    let interval;
    if (isSpinning) {
      const totalSpins = NUM_SEGMENTS * 2;
      const intervalTime = (SPIN_TIME * 1000) / totalSpins;
      let spins = 0;

      interval = setInterval(() => {
        setCurrentSegment((prev) => (prev + 1) % NUM_SEGMENTS);
        spins += 1;
        if (spins >= totalSpins) {
          clearInterval(interval);
          finalizeSpin();
        }
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [isSpinning]);

  const finalizeSpin = () => {
    const randomSegment = Math.floor(Math.random() * NUM_SEGMENTS);
    setSelectedSegment(randomSegment);

    setTimeout(() => {
      const betCount = betNumbers[randomSegment] || 0;
      let novoSaldo = balance;
      if (betCount > 0) {
        const prize = bet * betCount * 2;
        novoSaldo += prize;
        toast.success(`Parabéns! Você acertou o número ${randomSegment} e ganhou ${prize}!`);
      } else {
        novoSaldo -= bet;
        toast.success(`Que pena! O número sorteado foi ${randomSegment}. Você perdeu a aposta de ${bet}.`);
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
      toast.info("Insira uma aposta válida dentro do seu saldo.");
      return;
    }

    if (Object.keys(betNumbers).length === 0) {
      toast.info("Escolha ao menos um número para apostar.");
      return;
    }

    setIsSpinning(true);
    setSelectedSegment(null);
  };

  const addBet = (num) => {
    if (isSpinning) return;
    if (Object.values(betNumbers).reduce((sum, count) => sum + count, 0) >= MAX_BETS) {
      toast.info(`Você pode apostar no máximo ${MAX_BETS} vezes no total.`);
      return;
    }

    setBet(bet + 10);
    setBetNumbers((prevNumbers) => ({
      ...prevNumbers,
      [num]: (prevNumbers[num] || 0) + 1,
    }));
  };

  const clearBets = () => {
    if (isSpinning) return;
    setBet(0);
    setBetNumbers({});
  };

  return (
    <div className="fundoImput">
      <div className="legenda">
        <strong className="strong">Saldo: </strong> $ {balance}<br />
        <strong className="strong">Aposta Atual: </strong> $ {bet}<br />
        <strong className="strong">Números Apostados: </strong>
        {Object.entries(betNumbers).map(([num, count]) => `${num} (${count}x)`).join(", ") || "Nenhum"}
      </div>

      <div className="roleta-euro">
        <div className="roleta-euro__sectors">
          <img
            src={resizedImages[selectedSegment !== null ? selectedSegment : currentSegment]}
            alt={`Segmento ${selectedSegment !== null ? selectedSegment : currentSegment}`}
            className="roulette-image"
          />
        </div>
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