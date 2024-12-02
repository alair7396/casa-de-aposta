import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";
import ServicoUsuarios from "../../servicos/ServicoUsuarios";
import Avatar from "../../Componentes/Avatar/Avatar";
import { toast } from "react-toastify";
import "./PaginaPerfil.css";
import HamburgerMenu from "../../Componentes/Menu/HamburgerMenu";

const servicoUsuarios = new ServicoUsuarios();

const PaginaPerfil = () => {
  const usuarioLogado = ServicoAutenticacao.buscarUsuarioLogado();
  const emailUsuarioLogado = usuarioLogado ? usuarioLogado.email : null;

  const [imagemUsuario, setImagemUsuario] = useState("");
  const [saldo, setSaldo] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false); // Controla o estado do menu hambúrguer

  // Busca o saldo do usuário ao carregar o componente
  useEffect(() => {
    const buscarSaldoUsuario = async () => {
      if (!emailUsuarioLogado) {
        toast.error("Usuário não está logado.");
        return;
      }

      try {
        const saldoAtualizado = await servicoUsuarios.obterSaldoUsuario(emailUsuarioLogado);
        setSaldo(saldoAtualizado);
      } catch (error) {
        toast.error("Erro ao buscar saldo do usuário.");
        console.error("Erro ao buscar saldo:", error);
      }
    };

    buscarSaldoUsuario();
  }, [emailUsuarioLogado]);

  // Recupera a imagem do avatar ao carregar o componente
  useEffect(() => {
    const avatarSalvo = localStorage.getItem("avatarUsuario");
    if (avatarSalvo) {
      setImagemUsuario(avatarSalvo);
    }
  }, []);

  const mudarAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64String = event.target.result;
        setImagemUsuario(base64String);
        localStorage.setItem("avatarUsuario", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  
  
  return (
    <>
      <HamburgerMenu/>


      <div className="perfil-container">
        <div className="avatar-container">
          <input
            type="file"
            accept="image/*"
            multiple={false}
            id="fileInput"
            style={{ display: "none" }}
            onChange={mudarAvatar}
          />
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="avatar-button"
          >
            <Avatar nome={usuarioLogado?.nome} perfil={true} imagem={imagemUsuario} />
          </button>
        </div>

        <div className="campo">
          <label>Nome</label>
          <input type="text" value={usuarioLogado?.nome || ""} disabled />
        </div>

        <div className="campo">
          <label>Email</label>
          <input type="text" value={usuarioLogado?.email || ""} disabled />
        </div>

        <div className="campo">
          <label>Saldo da Carteira</label>
          <input
            type="text"
            value={saldo !== null ? `$ ${saldo}` : "Carregando..."}
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default PaginaPerfil;
